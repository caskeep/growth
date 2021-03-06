import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text, View, ScrollView } from 'react-native';
import { Card, List, ListItem } from 'react-native-elements';
import * as shortid from 'shortid';

import SKILL_TREE_DATA from './SKILL_TREE_DATA';
import AppFonts from '../../theme/fonts';
import Helper from '../../utils/helper';

const filter = require('lodash.filter');

class SkillDetailView extends Component {
  static componentName = 'SkillDetailView';

  static propTypes = {
    skillId: PropTypes.number,
  };

  static defaultProps = {
    skillId: null,
  };

  static openPage(link) {
    return Helper.openLink(link);
  }

  constructor() {
    super();
    SkillDetailView.openPage = SkillDetailView.openPage.bind(this);
  }

  render() {
    const skillData = filter(SKILL_TREE_DATA, { id: this.props.skillId })[0];
    let skillLinkList = null;
    if (skillData.links) {
      skillLinkList = (<View>
        <Text style={{ paddingTop: 15, paddingLeft: 15, fontSize: AppFonts.h4.size }}>扩展资料</Text>
        <List containerStyle={{ borderTopWidth: 0 }}>
          {
            skillData.links.map(link => (
              <ListItem
                key={shortid.generate()}
                title={link.label}
                onPress={() => SkillDetailView.openPage(link.url)}
              />
            ))
          }
        </List>
      </View>);
    }

    let skillBookList = null;
    if (skillData.books) {
      skillBookList = (<View>
        <Text style={{ paddingTop: 15, paddingLeft: 15, fontSize: AppFonts.h4.size }}>推荐书籍</Text>
        <List containerStyle={{ marginBottom: 20 }}>
          {
            skillData.books.map(link => (
              <ListItem
                key={shortid.generate()}
                title={link.label}
                onPress={() => SkillDetailView.openPage(link.url)}
              />
            ))
          }
        </List>
      </View>);
    }

    let rankDescriptions = null;
    if (skillData.rankDescriptions) {
      rankDescriptions = (<View>
        <Text style={{ paddingTop: 15, paddingLeft: 15, fontSize: AppFonts.h4.size }}>技能要求</Text>
        <List containerStyle={{ marginBottom: 20 }}>
          {
            skillData.rankDescriptions.map(link => (
              <ListItem
                hideChevron
                key={shortid.generate()}
                title={link}
                leftIcon={{ name: 'av-timer' }}
              />
            ))
          }
        </List>
      </View>);
    }

    return (
      <ScrollView>
        <Card
          title={'技能简介'}
        >
          <Text>{ skillData.description }</Text>
        </Card>
        {rankDescriptions}
        {skillLinkList}
        {skillBookList}
      </ScrollView>
    );
  }
}

export default SkillDetailView;
