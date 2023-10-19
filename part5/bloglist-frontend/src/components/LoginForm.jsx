import PropTypes from "prop-types";

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

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  handleUsername: PropTypes.func.isRequired,
  handlePassword: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
};

export default LoginForm;
