import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  CategoryDocument,
  LocationDocument,
  PlaceDocument,
  PlacesDTO,
  ScheduleDocument,
} from 'src/schema/dtos';

@Injectable()
export class PlaceService {
  constructor(
    @InjectModel('Place') private readonly place: Model<PlaceDocument>,
    @InjectModel('Location') private readonly location: Model<LocationDocument>,
    @InjectModel('Category') private readonly category: Model<CategoryDocument>,
    @InjectModel('Schedule') private readonly schedule: Model<ScheduleDocument>,
  ) {}

  private logger = new Logger();

  async addPlace(name: string) {
    const url = `https://catalog.api.2gis.com/3.0/items?q=Астана ${name}&key=${process.env?.API_KEY}&has_photos=true&fields=items.point`;
    const resp = await fetch(url).then((res) => res.json());
    const items = resp.result.items as any[];
    const { id } = items.find(
      (el) => el.name?.toLowerCase().includes(name.toLowerCase()),
    );

    if (!id)
      throw new NotFoundException('Место не найдено, введите совпадение');

    // const location = bestMatch?.map((el) => el.point);

    const url1 = `https://catalog.api.2gis.com/3.0/items/byid?id=${id}&key=${process.env?.API_KEY}&fields=items.point,items.links,items.external_content,items.rubrics,items.reviews,items.schedule`;
    const response = await fetch(url1)
      .then((res) => res.json())
      .then((res) => res.result.items[0]);

    const location = response.point;
    const categories = response.rubrics.map((r) => ({
      name: r.name,
    }));
    const image = response.external_content?.find(
      (content) => content.type === 'photo_album',
    ).main_photo_url;

    const neighborhood = response.links.nearest_stations[0];
    // this.logger.log('Соседи', neighborhood);
    const score_2gis = response.reviews.general_rating;

    let scheduleArray = [];
    if (response.schedule) {
      scheduleArray = Object.entries(response.schedule)
        .map(([day, data]: [day: any, data: any]) => {
          const workingHours =
            data.working_hours && data.working_hours.length > 0
              ? data.working_hours[0]
              : { from: '', to: '' };
          return {
            from: workingHours.from,
            to: workingHours.to,
            day: day,
          };
        })
        .sort((a, b) => {
          const daysOrder = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
          return daysOrder.indexOf(a.day) - daysOrder.indexOf(b.day);
        });
    }

    this.logger.log('Расписание', scheduleArray);

    const schedules =
      scheduleArray.length > 0
        ? await this.schedule.create({ schedule: scheduleArray })
        : null;
    // // // this.logger.log('schedules', schedules);
    const locationData = await this.location.create(location);
    const categoriesData = (await this.category.insertMany(categories)).map(
      (c) => c._id,
    );
    // // this.logger.log('coords', locationData._id);

    const data: PlacesDTO = {
      address: response.address_name as string,
      title: response.name as string,
      score_2gis: Number(score_2gis),
      image,
      subtitle: response.full_name as string,
      url: `https://2gis.kz/astana/firm/${id}`,
      building_id: response.id,
      location_id: locationData._id,
      category_id: categoriesData,
      neighborhood_name: neighborhood.name,
      neighborhood_id: neighborhood.id,
      schedule_id: schedules && schedules._id,
    };

    const insertedPlace = await this.place.create(data);

    return insertedPlace;
  }
}
