import React from 'react';
import Link from '@docusaurus/Link';

export type Props = { width: number };

const SFJLinks: React.FC<Props> = (props) => {
  const width = props.height ?? 100; // '??' because props.height can also be 0 and 0 is false

  return <div>
    <Link style={{ marginRight: '10px' , backgroundColor: '#142032'}}
    className="button button--lg"
    to="/faststore/quickstart">
    Quickstart
</Link>

<Link
    className="button button--secondary button--lg"
    to="https://storecomponents.vtex.app/">
    See demo
</Link>
</div>;
};

export default SFJLinks;
