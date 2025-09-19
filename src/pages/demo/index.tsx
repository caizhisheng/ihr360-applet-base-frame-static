import * as React from 'react';
import { bindActionCreators } from 'redux';
import { asyncAction, asyncPromiseAction } from '../../actions/demo';
import { connect } from 'react-redux';
import '../../assets/less/index.less';
import * as _ from 'lodash';

interface DemoProps {
    bizType?: string;
    asyncData?: any;
    asyncAction?: () => void;
    asyncPromiseAction?: () => Promise<any>;
}

class Home extends React.Component<DemoProps, any> {
    constructor(props: DemoProps, context: any) {
        super(props, context);
        this.state = {
            name: 'React Intl',
            code: '',
            isAsync: false
        };
    }

    /*组件挂载之前执行，只执行一次*/
    componentWillMount() {
        // process.env 获取当前环境变量
        this.props.asyncAction?.();
    }

    /*组件渲染完成，只执行一次*/
    componentDidMount() {
        return true;
    }

    /*组件将要接受新的props执行，执行多次*/
    componentWillReceiveProps(nextProps: any) {
        _.isEqual(this.props, nextProps);
        if (nextProps.asyncData.data instanceof Object) {
            this.setState({
                code: nextProps.asyncData.data.code
            })
        }
    }

    /*判断组件是否需要重新渲染，默认返回true*/
    shouldComponentUpdate(nextProps: any, nextState: any) {
        // console.log(this.props.asyncData !== nextProps.asyncData)
        return this.props.asyncData !== nextProps.asyncData;
    }

    /*组件将要被重新渲染*/
    componentWillUpdate() {
        return true;
    }

    /*组件重新渲染完成*/
    componentDidUpdate() {
        return true;
    }

    /*卸载组件*/
    componentWillUnmount() {
        return true;
    }

    componentDidCatch(error: any, info: any) {
        alert(11);
        console.log(error);
        console.log(info);
    }

    onShowSizeChange = (current: number, pageSize: number) => {
        console.log(current, pageSize);
    }

    getAsyncData = () => {
        const easyData = this.props.asyncPromiseAction?.();
        if (easyData) {
            easyData.then((res: any) => {
                // 异步获取数据后的逻辑处理...
            })
        }
        return true;
    }

    getSynchData = () => {
        // 同步获取数据实时绑定到view，在componentWillReceiveProps钩子函数中接收
        this.props.asyncAction?.();
        return true;
    }

    render() {
        return (
            <div>
                999
            </div>
        )
    }
}

const mapStateToProps = (state: any) => {
    // 实时处理model数据提升
    return {
        asyncData: state.asyncReducer
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        asyncAction: bindActionCreators(asyncAction, dispatch),
        asyncPromiseAction: bindActionCreators(asyncPromiseAction, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home as any)
