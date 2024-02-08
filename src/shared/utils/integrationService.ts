export const getIdFromName = async (name: string, API_KEY: string) => {
  try {
    const url = `https://catalog.api.2gis.com/3.0/items?q=Астана ${name}&key=${API_KEY}&has_photos=true&fields=items.point`;
    const resp = await fetch(url).then((res) => res.json());
    const items = resp.result.items as any[];
    const { id } = items.find(
      (el) => el.name?.toLowerCase().includes(name.toLowerCase()),
    );
    return id;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getResponseById = async (id: any, API_KEY) => {
  try {
    const url1 = `https://catalog.api.2gis.com/3.0/items/byid?id=${id}&key=${API_KEY}&fields=items.point,items.links,items.external_content,items.rubrics,items.reviews,items.schedule`;
    const response = await fetch(url1)
      .then((res) => res.json())
      .then((res) => res.result.items[0]);
    return response;
  } catch (error) {
    console.error(error);
    return null;
  }
};
