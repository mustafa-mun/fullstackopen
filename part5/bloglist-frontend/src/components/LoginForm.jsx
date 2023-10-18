const LoginForm = (props) => {
  return (
    <div>
      <form onSubmit={props.handleLogin}>
        <div>
          <label>username</label>
          <input value={props.username} onChange={props.handleUsername} />
        </div>
        <div>
          <label>password</label>
          <input
            type="password"
            value={props.password}
            onChange={props.handlePassword}
          />
        </div>
        <button>login</button>
      </form>
    </div>
  );
};

export default LoginForm;
