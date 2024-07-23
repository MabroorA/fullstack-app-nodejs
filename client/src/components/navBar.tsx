function NavBar() {
  return (
    <nav className=" flex flex-row justify-between p-5  mx-auto text-lg text-black md:flex-row max-w-7xl">
      <div className="flex items-center justify-between md:mb-0">
        <a href="/" className=" text-lg font-extrabold md:text-2xl list-inside">
          <div className="inline-block leading-none pr-7">
            Home{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-violet-400">
              Page
            </span>
          </div>
        </a>
      </div>
      <div className="flex flex-row space-x-4 ">
        <a href="/user" className="p-2">profile</a>
        <a href="/register" className="bg-gray-400 rounded-lg border text-white p-2  hover:bg-white hover:text-black hover:border-gray-300 hover:border hover:cursor-pointer">register</a>
        <a href="/login" className="bg-gray-800 rounded-lg border text-white p-2 hover:bg-white hover:text-black hover:border-gray-300 hover:border hover:cursor-pointer">login</a>
      </div>
    </nav>
  );
}

export default NavBar;
