import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';

@inject('i18nStore')
@observer
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      locale: '',
      name: '静雯',
      date: '去年秋天',
      place: '大理'
    };
  }

  componentDidMount() {
    const locale = navigator.language;
    this.props.i18nStore.setLocale(locale);
    this.setState({
      locale
    });
  }

  isChinese = lang => lang.startsWith('zh');

  switchLocale = () => {
    console.log(this.props.i18nStore.dict);
    const { locale } = this.state;
    this.props.i18nStore.setLocale(locale);
  };

  handleClickOnBtn = () => {
    const { locale } = this.state;
    const isZh = this.isChinese(locale);
    this.setState(
      {
        locale: isZh ? 'en' : 'zh'
      },
      this.switchLocale
    );
  };

  render() {
    const { i18nStore: i18n } = this.props;
    const name = i18n.t('home.name');
    const date = i18n.t('home.date');
    const place = i18n.t('home.place');
    return (
      <div>
        <button onClick={this.handleClickOnBtn}>{i18n.t('home.switch.locale')}</button>
        <div>{i18n.t('home.hello', { name })}</div>
        <div>{i18n.t('home.greeting')}</div>
        <div>{i18n.t('home.memory', { date, place })}</div>
      </div>
    );
  }
}

export default App;
