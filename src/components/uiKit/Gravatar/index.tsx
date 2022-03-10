import md5 from 'md5';

const Gravatar = ({ circle = false, email = '', d = 'retro', size = 100, ...props }) => (
  <img
    {...props}
    style={circle ? { borderRadius: '50%', ...props.style } : props.style}
    src={`https://www.gravatar.com/avatar/${md5(email.trim().toLowerCase())}?s=${size}&d=${d}`}
    alt="Gravatar"
  />
);

export default Gravatar;
