import React from 'react';
import './SearchBar.css'; 



class SearchBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = { term:'', location:'', sortBy:'best_match' };
        this.handleLocationChange = this.handleLocationChange.bind(this);
        this.handleTermChange = this.handleTermChange.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.sortByOptions = {
            'Best Match': 'best_match',
            'Highest Rated': 'rating',
            'Most Reviewed' : 'review_count'
        };
    }

    /*
    Returns the current CSS class for a sorting option. 
    This method will prove useful in providing visual feedback to users of Ravenous.
    */
    getSortByClass(sortByOption) {
        if (sortByOption === this.state.sortBy) {
            return 'active';
        } else {
            return '';
        }
    }

    handleSortByChange(sortByOption) {
        this.setState({ sortBy: sortByOption });
    }

    handleTermChange(e) {
        this.setState({ term: e.target.value });
    }

    handleLocationChange(e) { 
        this.setState({ location: e.target.value });
        e.preventDefault(); // to prevent the default action of clicking a link from triggering at the end of the method.
    }

    handleSearch(e) {
        this.props.searchYelp(this.state.term, this.state.location, this.state.sortBy);
    }

    renderSortByOptions() {
        return Object.keys(this.sortByOptions).map(sortByOption => {
                const sortByOptionValue = this.sortByOptions[sortByOption];
                return <li className={this.getSortByClass(sortByOptionValue)} 
                key={sortByOptionValue} 
                onClick={this.handleSortByChange.bind(this, sortByOptionValue)}>{sortByOption}</li>
            });
    }

    render() {
        return (
            <div className="SearchBar">
                <div className="SearchBar-sort-options">
                    <ul>{this.renderSortByOptions()}</ul>
                </div>
                <div className="SearchBar-fields">
                    <input placeholder="Search Businesses" 
                        onChange={this.handleTermChange}/>
                    <input placeholder="Where?" 
                        onChange={this.handleLocationChange}/>
                </div>
                <div className="SearchBar-submit">
                    {/* eslint-disable-next-line */}
                    <a onClick={this.handleSearch}>Let's Go</a>
                </div>
            </div>
        );
    }
}

export default SearchBar;