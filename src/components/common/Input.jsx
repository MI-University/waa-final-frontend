const Input = (props) => {
  return (
    <div className="">
      <h4 className={props.label ? 'mb-2 text-sm text-gray-500' : 'hidden'}>{props.label}</h4>
      <div className="flex items-center border rounded mb-4 h-11">
        <span className="w-12 h-full bg-gray-100 flex items-center justify-center text-accent">{props.prefix}</span>
        <input
          {...props}
          className={
            'px-4 w-full outline-accent outline-1 h-full ' + (props.className || '')
          }
        />
      </div>
    </div>
  );
};

export default Input;
