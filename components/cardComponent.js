import { Icon } from '@iconify/react';
import swordIcon from '../node_modules/@iconify-icons/mdi/sword';
import shieldIcon from '../node_modules/@iconify-icons/mdi/shield';
import hexagon from '../node_modules/@iconify-icons/mdi/hexagon-slice-3';

const CardComponent = ({ c, playable, attackable }) => {
  console.log(attackable);
  return (
    <div
      className={`flex flex-col items-center justify-between bg-indigo-400 m-2 rounded-md ring-${
        playable ? 'pink' : 'red'
      }-400 ring-${playable ? 4 : attackable ? 4 : 0}`}
      style={{ width: 200, height: 210 }}
    >
      <div className="flex justify-between w-11/12">
        <div className="m-0 text-white">{c.name} </div>
        <div className="flex justify-center items-center m-0 text-white">
          <Icon icon={hexagon} />
          {c.value}
        </div>
      </div>
      <div className="text-white">{c.tapped ? 'tapped' : ''}</div>
      <div className="flex justify-between w-11/12">
        <div className="flex justify-center items-center m-0 text-white">
          <Icon icon={swordIcon} />
          {c.atk}
        </div>
        <div className="flex justify-center items-center m-0 text-white">
          <Icon icon={shieldIcon} />
          {c.def}
        </div>
      </div>
    </div>
  );
};

export default CardComponent;
