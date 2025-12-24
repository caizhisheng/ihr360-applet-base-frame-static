import * as React from 'react';
// import { Link } from 'react-router-dom';

export default class LeftNav extends React.Component<any, any> {
    public render() {
        return (
            <aside className="w-[200px] bg-white border-r">
                <nav className="h-full py-4">
                    {/* 当需要添加菜单项时,可以使用以下结构:
                    <ul className="space-y-1 px-2">
                        <li>
                            <Link
                                to="/path"
                                className="flex items-center px-3 py-2 text-sm rounded-md hover:bg-accent hover:text-accent-foreground transition-colors"
                            >
                                菜单项
                            </Link>
                        </li>
                    </ul>
                    */}
                </nav>
            </aside>
        )
    }
}
