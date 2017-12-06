import React from 'react';
import { connect } from 'react-redux';
import {Accordion, List} from 'antd-mobile';
import assign from 'lodash.assign';

import topicon from './../icon/returnback.png';
import dateTime from './../method/dateTime.jsx';

const Item = List.Item;
const Brief = Item.Brief;

class Stage3 extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      first:false,
      next:false,

      disGiveNote:"block",

      insurance:"正在加载...",
      disInsurance:"block",

      transfersInfo:"正在加载...",
      disTransInfo:"block",
    };
  }
  componentDidMount() {
    if (this.props.infor.loaddata == null) {
      this.props.router.push('/');
      return
    }

    // 说明没有赠送
    if (!this.props.infor.loaddata.present) {
      this.props.router.push('/s4');
      document.body.scrollTop = document.documentElement.scrollTop = 0;
      return
    }

    let _date = assign({},this.state);

    // 第一次填写
    if (this.props.infor.loaddata.isRead == "N") {
      _date.first = true;
    }else {
      _date.first = false;
    }

    // 当有预定仙本那，就会有保险的提示
    if (this.props.infor.loaddata.template == 9) {
      _date.disGiveNote = "none";
    }
    let insurance = "";
    if (this.props.infor.loaddata.present != "" ) {
      let loginSuccessful = JSON.parse(localStorage.getItem('loginSuccessful'));
      insurance = dateTime.stampToFormat(loginSuccessful.insuranceBegin) +" 至 "+ dateTime.stampToFormat(loginSuccessful.insuranceEnd);
    }
    // 无接送
    if ( this.props.infor.loaddata.present == "1" ) {
      _date.disTransInfo = "none";
      _date.insurance = insurance;
    // 无保险
    }else if ( this.props.infor.loaddata.present == "2" ) {
      _date.disInsurance = "none";
      _date.transfersInfo = this.props.infor.loaddata.transfersInfo;
    // 接送和保险都有
    }else if ( this.props.infor.loaddata.present == "1,2" ) {
      _date.insurance = insurance;
      _date.transfersInfo = this.props.infor.loaddata.transfersInfo;
    }

    this.setState(_date);
  }
  render() {
    return (
      <div>
        <div className="NavTOP">
          {/*<div
            onClick={function(){
              if (this.state.first == false) {
                this.props.router.push('/index');
              }else {
                this.props.router.push('/s2');
              }
            }.bind(this)}
          >
            <div style={{
              width: '0.7rem',
              height: '0.7rem',
              background: 'url('+topicon+') center center /  0.7rem 0.7rem no-repeat' }}
            />
            <span  className="tipName">上一步</span>
          </div>*/}
          <span className="NavName">潜游时光赠送项目</span>
        </div>
        <div className="part3">
          <div style={{"display":this.state.disGiveNote}}>
            <div className="AccoAddtion">(如需修改保险/接送信息，请联系客服)</div>
            <div className="Accordion">
              <Accordion className="my-accordion">
                <Accordion.Panel header="赠送说明">
                  <div className="List">
                    <List className="my-list">
                      <Item wrap>2-3人每人赠送“保游全球”畅游海外旅行保障A计划或一次往返亚庇机场到市区酒店的接送（时间为6:05-21:55之间，超出时间需付35元夜间服务费）</Item>
                      <Item wrap>4-7人每人赠送“保游全球”畅游海外旅行保障A计划和一次往返亚庇机场到市区酒店的接送（时间不限）</Item>
                      <Item wrap>1. 免费提供给客户的是1-10天的A计划，如增加天数或选择计划B，客户需自补差价；</Item>
                      <Item wrap>A计划：1-10天17元/人，11-20天29元/人，21-25天41元/人，26-30天58元/人。</Item>
                      <Item wrap>B计划：1-10天28元/人，11-20天41元/人，21-25天52元/人，26-30天73元/人。</Item>
                      <Item wrap>2. 临时预定需自行购买保险，如未填写亚庇接送，默认赠送保险。</Item>
                    </List>
                  </div>
                </Accordion.Panel>
              </Accordion>
            </div>
          </div>
          <div style={{"display":this.state.disInsurance}}>
            <List renderHeader={() => '赠送保险'} className="my-list">
              <Item>“保游全球”畅游海外旅行保障A计划</Item>
            </List>
            <List renderHeader={() => '保险期间'} className="my-list">
              <Item>{this.state.insurance}</Item>
            </List>
          </div>
          <div style={{"display":this.state.disTransInfo}}>
            <List renderHeader={() => '接送'} className="my-list">
              <Item wrap>1次往返亚庇机场--市区酒店的接送,免费接机时间段为6:05-21:55，超出时间需另付35元</Item>
              <Item wrap>{this.state.transfersInfo}</Item>
            </List>
          </div>
        </div>
        <div className="NavBottom">
          {(function(){
            let _this = this;
            if (this.state.first) {
              return <div className="submitContent">
                <div className="saveDataActive" onClick={function(){
                  if (_this.state.first == false) {
                    _this.props.router.push('/index');
                  }else {
                    _this.props.router.push('/s2');
                  }
                }}>上一步</div>
                <div className="newNextPageActive" onClick={function(){
                  _this.props.router.push('/s4');
                  document.body.scrollTop = document.documentElement.scrollTop = 0;
                }}>下一步</div>
              </div>
            }else {
              return <div className="NextPageActi" onClick={function(){
                _this.props.router.push('/index');
                document.body.scrollTop = document.documentElement.scrollTop = 0;
              }}>返回</div>
            }
          }.bind(this))()}
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state, ownProps) => ({
  infor:state.reducer.infor
});

export default Stage3 = connect(
  mapStateToProps
)(Stage3);
