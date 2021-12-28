interface Props {
  children?: React.ReactNode;
}

const Label = ({ children }: Props) => {
  return (
    <label
      className="flex items-center px-2 mb-3 rounded-md overflow-hidden border border-slate-300 
      focus-within:border-slate-500 text-slate-300 focus-within:text-slate-500 duration-200"
    >
      {children}
    </label>
  );
};

export default Label;
