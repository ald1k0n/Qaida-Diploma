from fastapi import FastAPI, HTTPException
from Model.KNN import generateRecommendationIds, getPlacesByIds
from typing import List
from pydantic import BaseModel

app = FastAPI()

class UserId(BaseModel):
    user_id: str


@app.post('/recommend')
async def get_recommendation(user_id:UserId):
    if not user_id:
        raise HTTPException(status_code=400, detail="Ид пользователя не отправлен")
    
    recids = generateRecommendationIds(user_id.user_id)
    recommended_places = getPlacesByIds(recids)
    return recommended_places

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8001)