import { Card, CardActions, CardContent, CardMedia, Button, Typography } from "@mui/material";

const cardData = [
  {
    title: "제주도 여행",
    desc: "푸른 바다와 오름이 있는 힐링 여행지",
    image: "https://picsum.photos/seed/jeju/400/200",
  },
  {
    title: "부산 맛집 투어",
    desc: "해운대 앞바다와 함께하는 미식 여행",
    image: "https://picsum.photos/seed/busan/400/200",
  },
  {
    title: "서울 야경 산책",
    desc: "한강과 도심 불빛이 어우러진 밤 산책 코스",
    image: "https://picsum.photos/seed/seoul/400/200",
  },
];

const Content = () => {
  return (
    <section className="flex flex-wrap justify-center gap-4 p-4">
      {cardData.map((item) => (
        <Card key={item.title} sx={{ maxWidth: 300 }}>
          <CardMedia component="img" height="140" image={item.image} alt={item.title} />
          <CardContent>
            <Typography gutterBottom variant="h6" component="div">
              {item.title}
            </Typography>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              {item.desc}
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small">자세히 보기</Button>
          </CardActions>
        </Card>
      ))}
    </section>
  );
};

export default Content;
