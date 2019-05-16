import React, { Component } from "react";
import request from "superagent";

class Blog extends Component {
  constructor(props) {
    super(props);
    // Sets up our initial state
    this.state = {
      error: false,
      hasMore: true,
      isLoading: false,
      users: []
    };
  }

  // Binds our scroll event handler
  handleScroll = () => {
    const {
      loadUsers,
      state: { error, isLoading, hasMore }
    } = this;

    // Bails early if:
    // * there's an error
    // * it's already loading
    // * there's nothing left to load
    if (error || isLoading || !hasMore) return;

    // Checks that the page has scrolled to the bottom
    if (
      window.innerHeight + window.scrollY >=
      document.body.offsetHeight - 500
    ) {
      loadUsers();
    }
  };
  componentDidMount() {
    window.addEventListener("scroll", this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }
  componentWillMount() {
    // Loads some users on initial load
    this.loadUsers();
  }

  loadUsers = () => {
    this.setState({ isLoading: true }, () => {
      request
        .get("https://randomuser.me/api/?results=10")
        .then(results => {
          // Creates a massaged array of user data
          const nextUsers = results.body.results.map(user => ({
            email: user.email,
            name: Object.values(user.name).join(" "),
            photo: user.picture.medium,
            username: user.login.username,
            uuid: user.login.uuid
          }));

          // Merges the next users into our existing users
          this.setState({
            // Note: Depending on the API you're using, this value may
            // be returned as part of the payload to indicate that there
            // is no additional data to be loaded
            hasMore: this.state.users.length < 100,
            isLoading: false,
            users: [...this.state.users, ...nextUsers]
          });
        })
        .catch(err => {
          this.setState({
            error: err.message,
            isLoading: false
          });
        });
    });
  };

  render() {
    // <div className="contaier text-left">
    //   <article>
    //     <header>
    //       <h1>What Does WWF Do?</h1>
    //       <p>WWF's mission:</p>
    //     </header>
    //     <p>
    //       <div class="alert alert-primary" role="alert">
    //         WWF's mission is to stop the degradation of our planet's natural
    //         environment, and build a future in which humans live in harmony
    //         with nature.
    //       </div>
    //     </p>
    //   </article>
    // </div>
    const { error, hasMore, isLoading, users } = this.state;
    return (
      <div>
        <h1>Infinite Users!</h1>
        <p>Scroll down to load more!!</p>

        {users.map((user, index) => (
          <React.Fragment key={user.username}>
            <hr />
            <h1>{index + 1}</h1>
            <div style={{ display: "flex" }}>
              <img
                alt={user.username}
                src={user.photo}
                style={{
                  borderRadius: "50%",
                  height: 72,
                  marginRight: 20,
                  width: 72
                }}
              />
              <div>
                <h2 style={{ marginTop: 0 }}>@{user.username}</h2>
                <p>Name: {user.name}</p>
                <p>Email: {user.email}</p>
              </div>
            </div>
          </React.Fragment>
        ))}
        <hr />
        {error && <div style={{ color: "#900" }}>{error}</div>}
        {isLoading && <div>Loading...</div>}
        {!hasMore && <div>You did it! You reached the end!</div>}
      </div>
    );
  }
}

export default Blog;
