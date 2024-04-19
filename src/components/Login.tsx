import styles from "@/styles/login.module.css";

const Login = ({ isOpen, onClose }: any) => {
  if (!isOpen) return null;
  return (
    <div className={`${styles.modalBackdrop}`}>
      <div className={`${styles.modalContent} relative shadow-2xl`}>
        <button onClick={onClose} className="absolute top-3 right-3">
          <span className="material-symbols-outlined ">close</span>
        </button>
        <h2 className="font-body">
          <span className="text-[2rem] font-medium">Welcome!</span>
          <span className="">Login</span>
        </h2>
        <p></p>
        <form>
          <input type="email" placeholder="Email" required />
          <input type="password" placeholder="Password" required />
          <button type="submit">Log In</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
