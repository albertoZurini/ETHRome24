import { FC } from 'react';
import { useAccount, useEnsName, useEnsAvatar } from 'wagmi';

export const EOA: FC = () => {
    const { address } = useAccount();

    const { data: name } = useEnsName({ address, chainId: 1 });
    const { data: avatar } = useEnsAvatar({ name: name as string | undefined, chainId: 1 });
    function formatAddress(address: `0x${string}` | undefined) {
        return address ? address.substring(0, 4) + '...' + address.substring(address.length - 4, address.length) : ''
    }

    return (
        <div className="flex items-center gap-2">
            <img
                src={avatar || 'https://docs.ens.domains/fallback.svg'}
                className="w-8 h-8 rounded-full"
            />
            {name && (
                <>
                    <div className="flex flex-col gap-0 leading-3 pr-10">
                        {name && <span className="font-bold">{name}</span>}
                    </div>
                    <div className="flex flex-col gap-0 leading-3 pr-10">
                        |
                    </div>
                </>
            )}
            <div className="flex flex-col gap-0 leading-3 pr-10">
                <span>{formatAddress(address)}</span>
            </div>
        </div>
    );
};
