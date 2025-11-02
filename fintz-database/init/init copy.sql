-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 17/10/2025 às 04:15
-- Versão do servidor: 10.4.32-MariaDB
-- Versão do PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `bd2`
--

-- --------------------------------------------------------

--
-- Estrutura para tabela `afinidade_professor`
--

CREATE TABLE `afinidade_professor` (
  `id` int(11) NOT NULL,
  `matricula_professor` varchar(20) NOT NULL,
  `cod_disciplina` varchar(10) NOT NULL,
  `data_inclusao` date DEFAULT NULL,
  `data_encerramento` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `afinidade_professor`
--

INSERT INTO `afinidade_professor` (`id`, `matricula_professor`, `cod_disciplina`, `data_inclusao`, `data_encerramento`) VALUES
(600, 'P0001', 'D007', '2014-01-25', NULL),
(601, 'P0001', 'D004', '2022-09-22', NULL);

-- --------------------------------------------------------

--
-- Estrutura para tabela `aluno`
--

CREATE TABLE `aluno` (
  `matricula` varchar(20) NOT NULL,
  `cod_mec` int(11) NOT NULL,
  `data_inicio` date DEFAULT NULL,
  `cpf` char(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `aluno`
--

INSERT INTO `aluno` (`matricula`, `cod_mec`, `data_inicio`, `cpf`) VALUES
('A0001', 1002, '2019-04-09', '07337543303'),
('A0002', 1002, '2018-08-29', '67749649909');

-- --------------------------------------------------------

--
-- Estrutura para tabela `curso`
--

CREATE TABLE `curso` (
  `cod_mec` int(11) NOT NULL,
  `nome` varchar(255) NOT NULL,
  `data_autorizacao` date DEFAULT NULL,
  `modalidade` enum('Presencial','EAD','Híbrido','Semipresencial') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `curso`
--

INSERT INTO `curso` (`cod_mec`, `nome`, `data_autorizacao`, `modalidade`) VALUES
(1001, 'Ciência da Computação', '2010-03-15', 'Presencial'),
(1002, 'Engenharia de Software', '2012-08-20', 'Presencial'),
(1003, 'Sistemas de Informação', '2015-02-10', 'EAD'),
(1004, 'Análise e Desenvolvimento de Sistemas', '2018-06-05', 'Híbrido');

-- --------------------------------------------------------

--
-- Estrutura para tabela `disciplina`
--

CREATE TABLE `disciplina` (
  `cod_disciplina` varchar(10) NOT NULL,
  `nome` varchar(255) NOT NULL,
  `carga_horaria` int(11) DEFAULT NULL,
  `ementa` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `disciplina`
--

INSERT INTO `disciplina` (`cod_disciplina`, `nome`, `carga_horaria`, `ementa`) VALUES
('D001', 'Programação I', 60, 'Ementa de Programação I (conteúdo simulado).'),
('D002', 'Programação II', 60, 'Ementa de Programação II (conteúdo simulado).');

-- --------------------------------------------------------

--
-- Estrutura para tabela `horario_aluno`
--

CREATE TABLE `horario_aluno` (
  `id` varchar(15) NOT NULL,
  `matricula_aluno` varchar(20) NOT NULL,
  `id_oferta_semestre` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `horario_aluno`
--

INSERT INTO `horario_aluno` (`id`, `matricula_aluno`, `id_oferta_semestre`) VALUES
('H00001', 'A0001', 132),
('H00003', 'A0001', 136);

-- --------------------------------------------------------

--
-- Estrutura para tabela `oferta_semestre`
--

CREATE TABLE `oferta_semestre` (
  `id` int(11) NOT NULL,
  `semestre` varchar(8) NOT NULL,
  `id_afinidade_professor` int(11) NOT NULL,
  `codigo_sala` varchar(20) NOT NULL,
  `dia_semana` char(3) DEFAULT NULL,
  `horario_ini` time DEFAULT NULL,
  `horario_fim` time DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `oferta_semestre`
--

INSERT INTO `oferta_semestre` (`id`, `semestre`, `id_afinidade_professor`, `codigo_sala`, `dia_semana`, `horario_ini`, `horario_fim`) VALUES
(119, '2025.1', 655, 'S09', 'Qui', '15:00:00', '16:00:00'),
(120, '2025.1', 689, 'S09', 'Qui', '13:00:00', '15:00:00');

-- --------------------------------------------------------

--
-- Estrutura para tabela `pessoa`
--

CREATE TABLE `pessoa` (
  `cpf` char(11) NOT NULL,
  `nome` varchar(255) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `sexo` enum('Masculino','Feminino','Outro','Não Informado') DEFAULT NULL,
  `data_nascimento` date DEFAULT NULL,
  `telefone` varchar(15) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `pessoa`
--

INSERT INTO `pessoa` (`cpf`, `nome`, `email`, `sexo`, `data_nascimento`, `telefone`) VALUES
('00025787298', 'Sofia Moreira', 'sofia.moreira102@exemplo.com', 'Não Informado', '1977-07-13', '983357939'),
('00330923271', 'Thiago Oliveira', 'thiago.oliveira158@exemplo.com', 'Outro', '2000-01-26', '911529494');

-- --------------------------------------------------------

--
-- Estrutura para tabela `professor`
--

CREATE TABLE `professor` (
  `matricula` varchar(20) NOT NULL,
  `titulacao` enum('Graduado','Especialista','Mestre','Doutor','Pós-Doutor') NOT NULL,
  `data_admissao` date DEFAULT NULL,
  `cpf` char(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `professor`
--

INSERT INTO `professor` (`matricula`, `titulacao`, `data_admissao`, `cpf`) VALUES
('P0001', 'Graduado', '2016-10-30', '63854678544'),
('P0002', 'Mestre', '2023-12-27', '11047541212');

-- --------------------------------------------------------

--
-- Estrutura para tabela `salas`
--

CREATE TABLE `salas` (
  `codigo` varchar(20) NOT NULL,
  `tipo` enum('Sala de Aula','Laboratório','Auditório') NOT NULL,
  `capacidade` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `salas`
--

INSERT INTO `salas` (`codigo`, `tipo`, `capacidade`) VALUES
('S01', 'Sala de Aula', 80),
('S02', 'Laboratório', 40),
('S03', 'Laboratório', 80),
('S04', 'Laboratório', 30),
('S05', 'Sala de Aula', 60),
('S06', 'Laboratório', 50),
('S07', 'Sala de Aula', 40),
('S08', 'Laboratório', 30),
('S09', 'Sala de Aula', 60),
('S10', 'Sala de Aula', 50);

--
-- Índices para tabelas despejadas
--

--
-- Índices de tabela `afinidade_professor`
--
ALTER TABLE `afinidade_professor`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `matricula` (`matricula_professor`,`cod_disciplina`),
  ADD KEY `cod_disciplina` (`cod_disciplina`);

--
-- Índices de tabela `aluno`
--
ALTER TABLE `aluno`
  ADD PRIMARY KEY (`matricula`),
  ADD UNIQUE KEY `cpf` (`cpf`),
  ADD KEY `cod_mec` (`cod_mec`);

--
-- Índices de tabela `curso`
--
ALTER TABLE `curso`
  ADD PRIMARY KEY (`cod_mec`);

--
-- Índices de tabela `disciplina`
--
ALTER TABLE `disciplina`
  ADD PRIMARY KEY (`cod_disciplina`);

--
-- Índices de tabela `horario_aluno`
--
ALTER TABLE `horario_aluno`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `matricula_aluno` (`matricula_aluno`,`id_oferta_semestre`),
  ADD KEY `id_oferta_semestre` (`id_oferta_semestre`);

--
-- Índices de tabela `oferta_semestre`
--
ALTER TABLE `oferta_semestre`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_afinidade_professor` (`id_afinidade_professor`),
  ADD KEY `codigo_sala` (`codigo_sala`);

--
-- Índices de tabela `pessoa`
--
ALTER TABLE `pessoa`
  ADD PRIMARY KEY (`cpf`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Índices de tabela `professor`
--
ALTER TABLE `professor`
  ADD PRIMARY KEY (`matricula`),
  ADD UNIQUE KEY `cpf` (`cpf`);

--
-- Índices de tabela `salas`
--
ALTER TABLE `salas`
  ADD PRIMARY KEY (`codigo`);

--
-- AUTO_INCREMENT para tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `afinidade_professor`
--
ALTER TABLE `afinidade_professor`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=697;

--
-- AUTO_INCREMENT de tabela `oferta_semestre`
--
ALTER TABLE `oferta_semestre`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=159;

--
-- Restrições para tabelas despejadas
--

--
-- Restrições para tabelas `afinidade_professor`
--
ALTER TABLE `afinidade_professor`
  ADD CONSTRAINT `afinidade_professor_ibfk_1` FOREIGN KEY (`matricula_professor`) REFERENCES `professor` (`matricula`),
  ADD CONSTRAINT `afinidade_professor_ibfk_2` FOREIGN KEY (`cod_disciplina`) REFERENCES `disciplina` (`cod_disciplina`);

--
-- Restrições para tabelas `aluno`
--
ALTER TABLE `aluno`
  ADD CONSTRAINT `aluno_ibfk_1` FOREIGN KEY (`cod_mec`) REFERENCES `curso` (`cod_mec`),
  ADD CONSTRAINT `aluno_ibfk_2` FOREIGN KEY (`cpf`) REFERENCES `pessoa` (`cpf`);

--
-- Restrições para tabelas `horario_aluno`
--
ALTER TABLE `horario_aluno`
  ADD CONSTRAINT `horario_aluno_ibfk_1` FOREIGN KEY (`matricula_aluno`) REFERENCES `aluno` (`matricula`),
  ADD CONSTRAINT `horario_aluno_ibfk_2` FOREIGN KEY (`id_oferta_semestre`) REFERENCES `oferta_semestre` (`id`);

--
-- Restrições para tabelas `oferta_semestre`
--
ALTER TABLE `oferta_semestre`
  ADD CONSTRAINT `oferta_semestre_ibfk_1` FOREIGN KEY (`id_afinidade_professor`) REFERENCES `afinidade_professor` (`id`),
  ADD CONSTRAINT `oferta_semestre_ibfk_2` FOREIGN KEY (`codigo_sala`) REFERENCES `salas` (`codigo`);

--
-- Restrições para tabelas `professor`
--
ALTER TABLE `professor`
  ADD CONSTRAINT `professor_ibfk_1` FOREIGN KEY (`cpf`) REFERENCES `pessoa` (`cpf`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
