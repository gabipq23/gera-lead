function Header() {
  return (
    <div className="relative z-2">
      {/* HEADER */}

      <header className="flex justify-between items-center p-3 py-1 pt-2 bg-[#8c8c8c]  px-6 md:px-10 lg:px-14">
        <div>
          <img src="\assets\megalead.png" className="h-12 w-36 "></img>
        </div>
        <div>
          <img src="\assets\logoMello.png" className="h-7 "></img>
        </div>
      </header>
    </div>
  );
}

export default Header;
