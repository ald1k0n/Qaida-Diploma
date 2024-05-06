from fastapi import FastAPI, HTTPException
from Model.Recommendation import generate_interests
from typing import List
from pydantic import BaseModel

class UserInterests(BaseModel):
    user_interests: List[str]

app = FastAPI()

@app.post('/recommend')
async def get_recommendation(user_interests: UserInterests):
  if not user_interests:
    raise HTTPException(status_code=400, detail="Интересы не выявлены")
  
  interests = generate_interests(user_interests)
  return interests


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)