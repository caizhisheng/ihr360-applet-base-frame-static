import * as React from "react";
import { FormattedMessage, injectIntl } from "irs-react-intl";
import { useStore } from "@/store/useStore";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

interface HomePageProps {
   bizType?: string;
   intlMessageManagerLocal?: any;
}

// 使用函数组件来展示 Zustand 状态管理
const HomePage: React.FC<HomePageProps> = () => {
    // 从 Zustand store 中获取状态和方法
    const count = useStore((state) => state.count);
    const message = useStore((state) => state.message);
    const user = useStore((state) => state.user);
    const increment = useStore((state) => state.increment);
    const decrement = useStore((state) => state.decrement);
    const reset = useStore((state) => state.reset);
    const setMessage = useStore((state) => state.setMessage);
    const setUser = useStore((state) => state.setUser);

    const [inputMessage, setInputMessage] = React.useState("");

    const handleLogin = () => {
        setUser({
            name: "测试用户",
            role: "管理员"
        });
    };

    const handleLogout = () => {
        setUser(null);
    };

    const handleUpdateMessage = () => {
        if (inputMessage.trim()) {
            setMessage(inputMessage);
            setInputMessage("");
        }
    };

    return (
        <div className="min-h-screen bg-background p-3 sm:p-4 md:p-6 lg:p-8">
            <div className="max-w-5xl mx-auto space-y-3 sm:space-y-4 md:space-y-5">
                {/* 标题区域 */}
                <div className="text-center space-y-1 sm:space-y-1.5 pt-2 sm:pt-3 md:pt-4">
                    <h1 className="text-lg sm:text-xl md:text-2xl lg:text-2xl font-bold tracking-tight">
                        Zustand 状态管理 Demo
                    </h1>
                    <p className="text-xs sm:text-sm md:text-sm text-muted-foreground">
                        <FormattedMessage id="IRS_DICT.cnb_salary_common_attention" defaultMessage="完整的状态管理示例" />
                    </p>
                </div>

                {/* 计数器卡片 */}
                <Card>
                    <CardHeader className="pb-2 sm:pb-3">
                        <CardTitle className="text-sm sm:text-base md:text-base">计数器示例</CardTitle>
                        <CardDescription className="text-xs sm:text-xs md:text-sm">使用 Zustand 管理计数器状态</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2 sm:space-y-3">
                        <div className="flex justify-center py-2 sm:py-3 md:py-4">
                            <div className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-bold text-primary">
                                {count}
                            </div>
                        </div>
                        <div className="flex justify-center gap-2 flex-wrap">
                            <Button
                                variant="destructive"
                                onClick={decrement}
                                size="sm"
                                className="text-xs sm:text-xs md:text-sm min-w-[70px] sm:min-w-[80px]"
                            >
                                - 减少
                            </Button>
                            <Button
                                variant="outline"
                                onClick={reset}
                                size="sm"
                                className="text-xs sm:text-xs md:text-sm min-w-[70px] sm:min-w-[80px]"
                            >
                                重置
                            </Button>
                            <Button
                                onClick={increment}
                                size="sm"
                                className="text-xs sm:text-xs md:text-sm min-w-[70px] sm:min-w-[80px]"
                            >
                                + 增加
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                {/* 消息管理卡片 */}
                <Card>
                    <CardHeader className="pb-2 sm:pb-3">
                        <CardTitle className="text-sm sm:text-base md:text-base">消息管理</CardTitle>
                        <CardDescription className="text-xs sm:text-xs md:text-sm">动态更新和持久化消息</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2 sm:space-y-3">
                        <div className="p-2.5 sm:p-3 md:p-3.5 bg-muted rounded-md min-h-[50px] sm:min-h-[60px] md:min-h-[70px] flex items-center">
                            <p className="text-xs sm:text-sm md:text-sm text-foreground break-words w-full">{message}</p>
                        </div>
                        <div className="flex gap-2 flex-col sm:flex-row">
                            <Input
                                value={inputMessage}
                                onChange={(e) => setInputMessage(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleUpdateMessage()}
                                placeholder="输入新消息..."
                                className="text-xs sm:text-sm md:text-sm h-8 sm:h-9"
                            />
                            <Button
                                onClick={handleUpdateMessage}
                                size="sm"
                                className="text-xs sm:text-xs md:text-sm h-8 sm:h-9 whitespace-nowrap"
                            >
                                更新消息
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                {/* 用户状态卡片 */}
                <Card>
                    <CardHeader className="pb-2 sm:pb-3">
                        <CardTitle className="text-sm sm:text-base md:text-base">用户状态管理</CardTitle>
                        <CardDescription className="text-xs sm:text-xs md:text-sm">模拟用户登录/登出状态</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2 sm:space-y-3">
                        {user ? (
                            <div className="space-y-2 sm:space-y-3">
                                <div className="p-2.5 sm:p-3 md:p-3.5 bg-muted rounded-md space-y-1 sm:space-y-1.5">
                                    <p className="text-xs sm:text-sm md:text-sm">
                                        <span className="font-semibold">用户名：</span>
                                        <span className="ml-1">{user.name}</span>
                                    </p>
                                    <p className="text-xs sm:text-sm md:text-sm">
                                        <span className="font-semibold">角色：</span>
                                        <span className="ml-1">{user.role}</span>
                                    </p>
                                </div>
                                <Button
                                    variant="destructive"
                                    onClick={handleLogout}
                                    className="w-full text-xs sm:text-sm md:text-sm h-8 sm:h-9"
                                    size="sm"
                                >
                                    退出登录
                                </Button>
                            </div>
                        ) : (
                            <div className="space-y-2 sm:space-y-3">
                                <div className="p-3 sm:p-4 md:p-5 bg-muted rounded-md text-center min-h-[60px] sm:min-h-[70px] md:min-h-[80px] flex items-center justify-center">
                                    <p className="text-xs sm:text-sm md:text-sm text-muted-foreground">未登录</p>
                                </div>
                                <Button
                                    onClick={handleLogin}
                                    className="w-full text-xs sm:text-sm md:text-sm h-8 sm:h-9"
                                    size="sm"
                                >
                                    模拟登录
                                </Button>
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* 功能说明卡片 */}
                <Card>
                    <CardHeader className="pb-2 sm:pb-3">
                        <CardTitle className="text-sm sm:text-base md:text-base">功能说明</CardTitle>
                        <CardDescription className="text-xs sm:text-xs md:text-sm">Zustand 核心特性展示</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ul className="space-y-1.5 sm:space-y-2">
                            <li className="flex items-start gap-2">
                                <span className="text-primary text-xs sm:text-sm mt-0.5">✓</span>
                                <span className="text-xs sm:text-xs md:text-sm leading-relaxed">使用 Zustand 进行状态管理</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-primary text-xs sm:text-sm mt-0.5">✓</span>
                                <span className="text-xs sm:text-xs md:text-sm leading-relaxed">支持 Redux DevTools 调试</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-primary text-xs sm:text-sm mt-0.5">✓</span>
                                <span className="text-xs sm:text-xs md:text-sm leading-relaxed">状态持久化到 localStorage</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-primary text-xs sm:text-sm mt-0.5">✓</span>
                                <span className="text-xs sm:text-xs md:text-sm leading-relaxed">简洁的 API，无需 Provider 包裹</span>
                            </li>
                        </ul>
                    </CardContent>
                </Card>

                {/* 底部间距 */}
                <div className="h-3 sm:h-4"></div>
            </div>
        </div>
    );
};

export default injectIntl(HomePage);
