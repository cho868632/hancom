const Profile = ({ name, job = "개발자" }) => {
  return (
    <div className="flex flex-col gap-1 rounded-lg bg-white/15 p-4 text-white">
      <h3 className="font-semibold">이름 : {name}</h3>
      <p className="text-white/80">직업 : {job}</p>
    </div>
  );
};

export default Profile;
