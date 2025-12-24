import * as React from 'react';
import { Link } from 'react-router-dom';

export default class HeadNav extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
    }
    public render() {
        return (
            <header className="bg-gray-800 text-white h-16">
                <nav className="flex items-center h-full px-4">
                    <Link
                        to="/home"
                        className="px-4 py-2 hover:bg-gray-700 rounded transition-colors"
                    >
                        首页
                    </Link>
                </nav>
            </header>
        )
    }
}
