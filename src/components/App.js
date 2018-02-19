require('normalize.css/normalize.css');
require('styles/App.scss');

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { cardClick, restart, saveUser } from '../actions/game-actions';
import Card from './Card';
import Stats from './Stats';
import Controls from './Controls';
import UserForm from './UserForm';
import classnames from 'classnames';

export class App extends Component {
  constructor(props) {
    super(props);
    this.cardClick = props.cardClick.bind(this);
    this.restart = props.restart.bind(this);
    this.saveUser = props.saveUser.bind(this);
    this.rowClasses = classnames('row');
  }
  componentDidMount() {}
  render() {
    console.log('game', this.props.state);
    return (
      <div className="wrap container">
        <div className="game">
          {this.props.shuffled.map((id, i) => {
            return <Card {...this.props.cards[id]} key={i} id={id} onClick={this.cardClick} />
          })}
        </div>
        <UserForm className={this.rowClasses} {...this.props} onSubmit={this.saveUser} />
        <Controls className={this.rowClasses} restart={this.restart} />
        <Stats className={this.rowClasses} totalClicks={this.props.totalClicks} />
     </div>

    );
  }
}

// AppContainer.js
const mapStateToProps = (state) => ({
  cards: state.game.cards,
  shuffled: state.game.shuffled,
  totalClicks: state.game.totalClicks,
  state: state.game
});

const mapDispatchToProps = {
  cardClick,
  restart,
  saveUser
};

const AppContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

export default AppContainer;
