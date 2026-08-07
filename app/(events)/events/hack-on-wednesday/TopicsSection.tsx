const weeks = [
    {
        number: "Semana 01",
        topics: [
            "Que vulnerabilidades explorar para ter acesso a um sistema?",
            "Quais são os passos principais para encontrar e explorar a vulnerabilidade que leva à escalada de privilégios?",
        ],
    },
    {
        number: "Semana 02",
        topics: [
            "Introdução ao conceito de enumeração de directórios com o GoBuster",
            "Descobrindo flags através de permissões inadequadas em MySQL, SMB e Redis",
        ],
    },
    {
        number: "Semana 03",
        topics: [
            "Explorando SQL Injection na prática: Resolvendo um Lab de SQLi do PortSwigger",
            "Introdução ao Burp Suite: A Ferramenta Essencial para testes de segurança em aplicações web",
        ],
    },
    {
        number: "Semana 04",
        topics: [
            "Como acelerar a evolução no hacking e Pentest com o MITRE ATT&CK",
            "Red Teaming com MITRE ATT&CK: Ferramentas e estratégias para aprimorar as habilidades",
        ],
    },
    {
        number: "Semana 05",
        topics: [
            "Main Attacker e Sub Attackers: Liderança e coordenação em operações cibernéticas",
            "Trabalho em equipa: Como Main e Sub Attackers actuam juntos para maximizar a eficiência",
        ],
    },
    {
        number: "Semana 06",
        topics: [
            "Desfiguração (Defacement)",
        ],
    },
    {
        number: "Semana 07",
        topics: [
            "Laboratório web com vulnerabilidades que possibilita enumeração de utilizadores e ataques de força bruta",
            "Shell obtida com base no msfconsole e escalada de privilégios",
        ],
    },
    {
        number: "Semana 08",
        topics: [
            "Exploração de vulnerabilidades conhecidas com Metasploit, facilitando o acesso a sistemas",
            "Utilização de exploits no Metasploit para identificar e explorar falhas",
        ],
    },
]

export default function TopicsSection() {
    return (
        <section className="py-24 px-6">
            <div className="max-w-4xl mx-auto">
                <div className="mb-12 text-center">
                    <span className="px-6 py-2 rounded-full border border-gray-600 text-sm text-gray-300 backdrop-blur-sm">
                        Temas Abordados
                    </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {weeks.map((week) => (
                        <div
                            key={week.number}
                            className="p-6 rounded-2xl border border-gray-700 bg-white/5 backdrop-blur-sm hover:border-gray-500 transition-colors"
                        >
                            <span className="text-xs font-mono text-gray-500 mb-4 block">{week.number}</span>
                            <ul className="flex flex-col gap-3">
                                {week.topics.map((topic, i) => (
                                    <li key={i} className="flex gap-3 text-sm text-gray-300 leading-relaxed">
                                        <span className="text-gray-600 mt-0.5">—</span>
                                        <span>{topic}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
