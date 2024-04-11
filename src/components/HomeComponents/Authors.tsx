const Authors = () => {
  return (
    <div className="flex border-2 border-blue-500 p-16">
      <div className="w-[40%] border-2 border-red-500">
        <p className="font-extralight tracking-wide text-base mb-2">
          KNOW YOUR AUTHOR
        </p>
        <h1 className="font-extrabold text-3xl font-body mb-2">
          Each course you undertake are designed by these authors
        </h1>
        <p className="w-[7rem] my-2 h-[3px] bg-[#00ECA3]"></p>
        <p>
          But I must explain to you how all this mistaken idea of denouncing
          pleasure and praising pain was born and I will give you a complete
          account of the system.
        </p>
        <p>
          Explorer of the truth, the master-builder of human happiness. No one
          rejects, dislikes, or avoids pleasure itself, because it is
        </p>
        <button></button>
      </div>
      <div className="w-[60%] grid grid-cols-3 grid-rows-2 border-2 border-red-500">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default Authors;
