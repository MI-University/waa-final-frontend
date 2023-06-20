const Form = (props) => {
  // @ts-ignore
  const { children, doSubmit, ...otheProps } = props;
  const filterSubmit = (e) => {
    e.preventDefault();
    const data = {};
    const formData = new FormData(e.target);
    for (const item of formData.entries()) {
      if (data[item[0]]) {
        const old = data[item[0]];
        if (Array.isArray(old)) {
          data[item[0]].push(...old);
          data[item[0]].push(item[1]);
        } else {
          data[item[0]] = [];
          data[item[0]].push(old);
          data[item[0]].push(item[1]);
        }
      } else {
        data[item[0]] = item[1];
      }
    }
    doSubmit(data);
  };

  return (
    <form onSubmit={filterSubmit} {...props} className="">
      {children}
    </form>
  );
};

export default Form;
