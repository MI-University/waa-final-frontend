const Input = (props) => {
  return (
    <div className="w-full">
      {props.label && (
        <h4 className={'mb-2 text-sm text-gray-500'}>{props.label}</h4>
      )}

      {props.type == 'radio' ? (
        <div className="inline-block flex items-center justify-center w-11 h-11">
          <input
            {...props}
            className={'px-4 p-4 cursor-pointer w-4 ' + (props.className || '')}
          />
        </div>
      ) : (
        <div className="flex items-center border rounded mb-4 h-11">
          {props.prefix && (
            <span className="w-12 h-full bg-gray-100 flex items-center justify-center text-accent">
              {props.prefix}
            </span>
          )}
          <input
            {...props}
            className={
              'px-4 w-full outline-accent rounded outline-1 h-full ' +
              (props.className || '')
            }
          />
        </div>
      )}
    </div>
  );
};

export default Input;
