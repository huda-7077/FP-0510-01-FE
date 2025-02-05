const InfoCard = ({
  icon,
  title,
  description,
  iconClass,
  bgColor,
  textColor,
}: any) => (
  <div className={`flex items-start rounded-md border-l-4 ${bgColor} p-4`}>
    {icon && (
      <div className={`mr-3 mt-1 flex-shrink-0 ${iconClass}`}>{icon}</div>
    )}
    <div>
      <h3 className={`mb-1 font-semibold ${textColor}`}>{title}</h3>
      <p className="text-sm">{description}</p>
    </div>
  </div>
);

export default InfoCard;
