const Form = (props) => {
  // @ts-ignore
  const { children, doSubmit, ...otheProps } = props;
  const filterSubmit = (e) => {
    e.preventDefault();
    const data = {};
    const formData = new FormData(e.target);
    for (const item of formData.entries()) {
      if (item[0]?.includes('[]')) {
        const key = item[0]?.replace('[]', '');
        const oldValue = data[key];
        if (oldValue) {
          data[key].push(item[1]);
        } else {
          data[key] = [];
          data[key].push(item[1]);
        }
      } else {
        data[item[0]] = item[1];
      }
    }
    console.log(data);

    doSubmit(data);
  };

  return (
    <form onSubmit={filterSubmit} {...props} className="">
      {children}
    </form>
  );
};

export default Form;
