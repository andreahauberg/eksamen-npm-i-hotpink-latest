const RegularTicketSVG = ({ className }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 300 150"
    width="300"
    height="150"
  >
    <defs>
      <clipPath id="serratedEdge">
        <path d="M0,0 h280 a10,10 0 0 1 10,10 v30 a10,10 0 0 1 -10,10 a10,10 0 0 0 0,20 a10,10 0 0 1 10,10 v30 a10,10 0 0 1 -10,10 h-280 a10,10 0 0 1 -10,-10 v-30 a10,10 0 0 1 10,-10 a10,10 0 0 0 0,-20 a10,10 0 0 1 -10,-10 v-30 a10,10 0 0 1 10,-10 z" />
      </clipPath>
    </defs>
    <rect
      x="10"
      y="10"
      width="280"
      height="130"
      fill="#afc2c3"
      stroke="#000"
      strokeWidth="2"
      clipPath="url(#serratedEdge)"
    />
    <text
      x="150"
      y="75"
      textAnchor="middle"
      dy=".3em"
      fontSize="36"
      fontFamily="Arial"
      fill="#000"
      fontWeight="bold"
    >
      TICKET
    </text>
  </svg>
);

export default RegularTicketSVG;
