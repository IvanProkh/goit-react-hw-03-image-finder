import PropTypes from 'prop-types';
import css from './FriendList.module.css';

export const FriendList = ({ friends }) => {
  return (
    <ul className={css.friend__list}>
      {friends.map(({ id, isOnline, avatar, name }) => (
        <li className={css.item} key={id}>
          <span
            className={`$ {css.status}  ${css[isOnline]} `}

            //* решение, поиска онлайн через ф-н
            // style={{ backgroundColor: checkStatus(isOnline) }}
          >
            {isOnline}
          </span>
          <img
            className={css.avatar}
            src={avatar}
            alt="User avatar"
            width="77"
          />
          <p className={css.name}>{name}</p>
        </li>
      ))}
    </ul>
  );
};

//* ф-н которая определяет пользователь онлайн или нет
// function checkStatus(isOnline) {
//   return isOnline ? 'green' : 'red';
// }

FriendList.propTypes = {
  friends: PropTypes.arrayOf(
    PropTypes.shape({
      avatar: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      isOnline: PropTypes.bool.isRequired,
      id: PropTypes.number.isRequired,
    })
  ),
};
