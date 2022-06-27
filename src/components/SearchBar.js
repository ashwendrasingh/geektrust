import React from 'react'

const SearchBar = (responsive, setQuery,data,query,setPosts) => {

    React.useEffect(() => {
        if (data.current) {
          let newPosts = data.current.filter(contact => {
            if (query === '') {
              return contact;
            } else if (contact.name.toLowerCase().includes(query.toLowerCase())) {
              return contact;
            }
            else if (contact.role.toLowerCase().includes(query.toLowerCase())) {
              return contact;
            }
            else if (contact.email.toLowerCase().includes(query.toLowerCase())) {
              return contact;
            }
          });
          setPosts(newPosts);
        }
      }, [query]);

    return (
        <div className="bi bi-search" style={{  paddingTop: responsive ? 20 :50  }}>
        <input
          className="search-input"
          placeholder="search......"
          onChange={event => setQuery(event.target.value)}
        />
      </div>
    )
}
export default SearchBar