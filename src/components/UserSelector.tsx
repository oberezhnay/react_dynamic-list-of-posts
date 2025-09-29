import React, { useEffect, useRef, useState } from 'react';
import { User } from '../types/User';
import classNames from 'classnames';

type Props = {
  users: User[];
  loadPosts: (id: number) => void;
  selectedUser: User | null;
  setSelectedUser: (value: User | null) => void;
  loading?: boolean;
  error?: string | null;
};

export const UserSelector: React.FC<Props> = ({
  users,
  loadPosts,
  selectedUser,
  setSelectedUser,
  loading = false,
  error = null,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const ref = useRef<HTMLDivElement | null>(null);

  const handleUserClick = (user: User) => {
    setSelectedUser(user);
    setIsOpen(false);
    loadPosts(user.id);
  };

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const outsideClickHandler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', outsideClickHandler);

    return () => document.removeEventListener('mousedown', outsideClickHandler);
  }, [isOpen]);

  return (
    <div
      data-cy="UserSelector"
      className={classNames('dropdown', {
        'is-active': isOpen,
      })}
      ref={ref}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={() => setIsOpen(!isOpen)}
        >
          {selectedUser ? (
            <span>{selectedUser.name}</span>
          ) : (
            <span>Choose a user</span>
          )}

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      <div className="dropdown-menu" id="dropdown-menu" role="menu">
        <div className="dropdown-content">
          {!loading &&
            !error &&
            users.map(user => (
              <a
                href={`#user-${user.id}`}
                className={classNames('dropdown-item', {
                  'is-active': selectedUser && user.id === selectedUser.id,
                })}
                key={user.id}
                onClick={() => handleUserClick(user)}
              >
                {user.name}
              </a>
            ))}
        </div>
      </div>
    </div>
  );
};
