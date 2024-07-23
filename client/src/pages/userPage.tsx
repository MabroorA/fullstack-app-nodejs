function UserPage() {
  // const userEmail = getUserEmail();
  const userEmail = "Testemail@gmail.com";
  return (
    <div className="flex flex-col mx-auto text-center ">
      <div className="text-3xl font-semibold text-center md:text-5xl">User Page</div>
      <div className="flex flex-row py-10 mx-auto text-center">
        <div className="p-2 font-bold "> User email:</div>
        <div className="p-2">{userEmail}</div>
      </div>
    </div>
  );
}

export default UserPage;
