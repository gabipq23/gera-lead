function Header() {
  return (
    <div className="relative z-2">
      {/* HEADER */}

      <header className="flex justify-between items-center p-3 bg-[#797b7c] px-6 md:px-10 lg:px-14">
        <div>
          <p className="text-[22px] text-neutral-200">Gera Lead</p>
        </div>
        <div>
          <img src="\assets\logoMello.png" className="h-8 "></img>
        </div>
      </header>
    </div>
  );
}

export default Header;
