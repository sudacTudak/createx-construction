import Tabs from './vendors/Tabs';
import '../scss/vendors/Tabs.scss';
import '../scss/news.scss';
import 'focus-visible';
import './go-top';
import './forms';

const newsList = document.querySelector('.categories__news')


if (newsList) {
    const tabsNews = new Tabs('tabsNews', {});
}