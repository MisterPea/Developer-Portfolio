

export default function RingedIcon({ icon }: { icon: JSX.Element; }) {
  return (
    <div className='icon-group'>
      <span className='icon'>{icon}</span>
      <svg className="ring" tabIndex={0}>
        <circle
          className="ring--circle"
          r="19"
          cx="40"
          cy="40" />
      </svg>
    </div >
  );
}