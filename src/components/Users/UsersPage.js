import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { Header } from '../Header';
import { UserCard } from './UserCard';
import Loading from '../Loading';
import { setLastSearchData } from '../../actions/actions';
import { formatError } from '../Format';
import { Pagination } from '../Pagination';

class UsersPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: props.lastSearch ? props.lastSearch.users : [],
      search: props.lastSearch ? props.lastSearch.search : '',
      currentPage: props.lastSearch ? props.lastSearch.currentPage : 1,
      error: null,
      isLoading: false
    }
  }
  setError = (error) => this.setState({ error })
  // Search
  onSearchInput = (e) => {
    this.setState({ search: e.target.value })
  };
  onSubmit = (e) => {
    e.preventDefault();
    this.setState({ error: null });
    if (!!this.state.search) {
      this.setState({ isLoading: true })
      axios
        .get(`https://api.github.com/search/users?q=${this.state.search}&page=${this.state.currentPage}`)
        .then(response => {
          response.data.total_count === 0 && this.setError('Sorry, no users found with this name!')
          this.props.setLastSearchData({
            users: response.data.items,
            totalCount: response.data.total_count,
            currentPage: 1,
            search: this.state.search
          })
          this.setState({
            users:response.data.items,
            isLoading: false,
          })
        })
        .catch(e => {
          formatError(e, this.setError)
          this.setState({ isLoading: false })
        })
    }
  };

  getNewPage = (page) => {
    axios
      .get(`https://api.github.com/search/users?q=${this.state.search}&page=${page}`)
      .then(response => {
        this.props.setLastSearchData({
          users: response.data.items,
          totalCount: response.data.total_count,
          currentPage: 1,
          search: this.state.search
        })
        this.setState({ 
          users: response.data.items,
          currentPage: page,
          isLoading: false
        })        
      })
      .catch(e => {
        formatError(e, setError)
        this.setState({ isLoading: false })
      })
  }

  render() {
    return (
      <div>
        <Header title="Spartans Test App" />
        <div className='page-container'>
          <form onSubmit={this.onSubmit} className='search-box'>
            <input
              id="search-input"
              value={this.state.search}
              onChange={this.onSearchInput}
              placeholder='Search Users'
            />
            <button className='search-btn' onClick={this.onSubmit}>Search</button>
          </form>
          {
            this.state.isLoading ?
              <Loading /> :
              this.state.error ?
                <h2 className='error-msg'>{this.state.error}</h2> :
                <div>
                  {
                    this.state.users.length > 0 &&
                    <div>
                      <Pagination getNewPage={this.getNewPage} currentPage={this.state.currentPage} totalCount={this.props.lastSearch.totalCount} />
                      <div className='list'>
                        {this.state.users.length > 0 && this.state.users.map(user => <UserCard key={user.id} userData={user} />)}
                      </div>
                    </div>
                  }
                </div>
          }
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  lastSearch: state
});

const mapDispatchToProps = (dispatch) => ({
  setLastSearchData: (data) => dispatch(setLastSearchData(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(UsersPage);