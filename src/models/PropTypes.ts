import { SWAP_DIRECTION } from "./Enum";
import { ILink, INetworkType, ISwapTokenParams, IToken } from "./Interfaces";
import { MESSAGE_TYPE } from './Enum';
interface BaseProps {
    children?: React.ReactNode;
    className?: string;
}
export interface AppProps {
    domElement: HTMLElement | null;
}
export interface ModalContainerProps extends BaseProps {
    width?: string;
}

export interface ModalHeaderProps extends BaseProps {
    title?: string;
    closeModal: () => void;
}

export interface ModalBodyProps extends BaseProps { }

export interface ModalFooterProps extends BaseProps { }
export interface TokenListingProps extends BaseProps {
    token: IToken;
}
export interface SwapInputFieldProps extends BaseProps {
    token: IToken;
    direction: SWAP_DIRECTION;
    setSwapParams: (params: ISwapTokenParams) => void;
    onOpenTokenList: (direction: SWAP_DIRECTION) => void;
    onUpdateTokenPrice: (price: number, loading: boolean, direction: SWAP_DIRECTION) => void;
}

export interface SelectTokenButtonProps extends BaseProps {
    token: IToken;
    launchModal: () => void;
}

export interface SelectTokenModalProps extends BaseProps {
    direction: SWAP_DIRECTION;
    selectToken: (params: ISwapTokenParams) => void;
    closeModal: () => void;
}
export interface ErrorModalProps extends BaseProps {
    type?: MESSAGE_TYPE;
    title?: string;
    message: string;
    closeModal: () => void;
}
export interface TokenSelectModalProps extends BaseProps {
    direction: SWAP_DIRECTION;
    onSelectedToken: (params: ISwapTokenParams) => void;
    closeModal: () => void;
}
export interface TokenBadgeProps extends BaseProps {
    token: IToken;
}

export interface TokenSelectProps extends BaseProps {
    token: IToken;
    onOpenTokenList: () => void;
}
export interface TokenListItemProps extends BaseProps {
    token: IToken;
    usdValue: number,
    onSelectedToken: (token: IToken) => void
}

export interface BottomLayoutProps extends BaseProps {
    openDialog: () => void;
}

export interface SwapProps extends BaseProps {
    tokens?: string | null;
}

export interface SwitchProps extends BaseProps {
    toggled: (isToggled: boolean) => void;
    label?: string
}
