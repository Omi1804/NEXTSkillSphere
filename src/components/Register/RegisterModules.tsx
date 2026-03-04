import {
  PasswordStrength,
  StatusMessageProps,
  TextFieldProps,
} from "@/types/register";
import { strengthStyles } from "@/utils/evaluatePassword";

export const StatusMessage = ({ variant, children }: StatusMessageProps) => {
  const base = "rounded-md px-4 py-3 font-body text-sm border";
  const styles =
    variant === "error"
      ? "border-red-200 bg-red-50 text-red-600"
      : "border-green-200 bg-green-50 text-green-700";

  return (
    <div className={`${base} ${styles}`} role="alert" aria-live="assertive">
      {children}
    </div>
  );
};

export const TextField = ({
  label,
  name,
  type = "text",
  value,
  onChange,
  autoComplete,
  disabled,
}: TextFieldProps) => (
  <div className="my-8">
    <label
      htmlFor={name}
      className="w-full font-body block text-[1rem] font-normal text-black"
    >
      {label}
    </label>
    <input
      id={name}
      name={name}
      type={type}
      value={value}
      autoComplete={autoComplete}
      required
      disabled={disabled}
      className="w-full border-[1px] px-5 py-2 bg-[#fafafa] rounded-tl-3xl outline-none border-[#b71717] shadow-sm mt-2 rounded-md text-[#5c5c5c] font-body focus:shadow-lg duration-300 focus:border-[#0000002e] disabled:cursor-not-allowed"
      onChange={onChange}
    />
  </div>
);

export const PasswordStrengthIndicator = ({
  level,
}: {
  level: PasswordStrength;
}) => (
  <p
    className={`py-3 px-12 w-[9.5rem] text-center my-3 border border-black rounded-sm font-body text-base font-semibold text-white ${strengthStyles[level].className}`}
  >
    {strengthStyles[level].label}
  </p>
);

export const InfoBanner = () => (
  <div className="flex gap-4 w-full border shadow-md mb-5 p-4 bg-white">
    <span className="material-symbols-outlined border p-2 bg-[#0A80A3] text-white rounded-md">
      info
    </span>
    <p className="py-2 px-1 font-body font-extralight text-[#333]">
      Registering for this site is easy. Just fill in the fields below, and
      we’ll get a new account set up for you in no time.
    </p>
  </div>
);

export const SubmitButton = ({ loading }: { loading: boolean }) => (
  <button
    type="submit"
    disabled={loading}
    className="flex items-center gap-3 font-bold rounded-lg justify-center w-[14rem] p-4 rounded-tl-[2.3rem] bg-[linear-gradient(90deg,_rgb(0,_237,_164)_0%,_rgb(106,_125,_241)_100%)] text-white hover:shadow-xl hover:scale-105 duration-300 hover:rounded-md disabled:opacity-70 disabled:hover:scale-100 disabled:cursor-not-allowed"
  >
    {loading ? (
      <>
        <span className="inline-flex h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
        Creating Account
      </>
    ) : (
      "Complete Sign Up"
    )}
  </button>
);
