import { useNavigate } from 'react-router-dom';
import './CardsAdmin.css';

const CardsAdmin = () => {

    const Card = ({ title, description, icon, onClick }) => (
        <div className="card-admin" onClick={onClick}>
            {icon && <div className="card-admin-icon">{icon}</div>}
            <h2 className="card-admin-title">{title}</h2>
            <p className="card-admin-description">{description}</p>
        </div>
    );

    const navigate = useNavigate();
    const cards = [
        {
            title: 'Usuarios',
            description: 'Gestiona los usuarios registrados',
            icon: '👤',
            onClick: () => navigate('/usuarios')
        },
        {
            title: 'Citas',
            description: 'Administra las citas programadas',
            icon: '📅',
            onClick: () => navigate('/citas')
        },
        {
            title: 'Reportes',
            description: 'Visualiza reportes y estadísticas',
            icon: '📊',
            onClick: () => navigate('/Reportes')
        }
    ];

    return (
        <div className="cards-admin-container">
            {cards.map((card, idx) => (
                <Card
                    key={idx}
                    title={card.title}
                    description={card.description}
                    icon={card.icon}
                    onClick={card.onClick}
                />
            ))}
        </div>
    );
};

export default CardsAdmin;