import styles from "@/styles/login.module.css";

const Login = ({ isOpen, onClose }: any) => {
  if (!isOpen) return null;
  return (
    <div className={`${styles.modalBackdrop}`}>
      <div className={`${styles.modalContent} relative shadow-2xl`}>
        <button onClick={onClose} className="absolute top-3 right-3">
          <span className="material-symbols-outlined ">close</span>
        </button>
        <h2 className="font-body flex items-center justify-center gap-2 mb-2">
          <span className="text-[1.8rem] font-medium">Welcome!</span>
          <span className="text-[1.8rem] font-bold bg-clip-text text-transparent bg-[linear-gradient(90deg,_rgb(0,_237,_164)_0%,_rgb(106,_125,_241)_100%)]">
            Login
          </span>
        </h2>
        <p className="w-[5rem] h-[3px] bg-[#00eda4] mx-auto"></p>
        <form className="border-2 border-red-500 p-2">
          <input type="email" placeholder="Email" required />
          <input type="password" placeholder="Password" required />
          <button type="submit">Log In</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
