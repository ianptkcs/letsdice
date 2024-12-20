import { Item } from '../src/interfaces/Item';
import randomUsername from '../src/lib/randomUsername';
import { PrismaClient } from '@prisma/client';
import systemsJSON from '../src/data/Systems.json';

const prisma = new PrismaClient();

/**
 * Função para gerar um nome de usuário aleatório com base no firebaseUID.
 * @param firebaseUID - O UID único do Firebase.
 * @returns Um nome de usuário gerado aleatoriamente.
 */

async function main() {
	// Limpar dados existentes (opcional)
	await prisma.table.deleteMany();
	await prisma.gameMaster.deleteMany();
	await prisma.player.deleteMany();
	await prisma.user.deleteMany();

	// Lista de firebaseUIDs fornecidos
	const firebaseUIDs = [
		't4txdOq1EVT3WKK8bJcM79RROJK2',
		'1qNCfgqKjEhKn558thRupKJcmwe2',
		'mC3rYlqGK3MNTE0cJFFITMleF2B2',
	];

	// Criar Usuários com usernames gerados aleatoriamente
	const usersData = firebaseUIDs.map((uid) => ({
		firebaseUID: uid,
		slug: randomUsername(uid),
	}));

	await prisma.user.createMany({
		data: usersData,
	});

	// Buscar os usuários criados
	const users = await prisma.user.findMany({
		where: {
			firebaseUID: {
				in: firebaseUIDs,
			},
		},
	});

	// Assinar cada usuário como GameMaster
	const gameMasters = await Promise.all(
		users.map((user) =>
			prisma.gameMaster.create({
				data: {
					userUID: user.firebaseUID,
					username: randomUsername(user.firebaseUID),
				},
			})
		)
	);

	// Opcional: Assinar cada usuário também como Player
	// Caso deseje que os mesmos usuários sejam jogadores, descomente o trecho abaixo
	/*
  const players = await Promise.all(
    users.map((user) =>
      prisma.player.create({
        data: {
          userID: user.firebaseUID,
        },
      })
    )
  );
  */

	// Alternativamente, criar Players adicionais caso deseje mais variedade
	// Aqui, para simplificar, vamos reutilizar os mesmos usuários como Players
	const players = await Promise.all(
		users.map((user) =>
			prisma.player.create({
				data: {
					userUID: user.firebaseUID,
					username: randomUsername(user.firebaseUID),
				},
			})
		)
	);

	// Função para gerar títulos e descrições fictícias
	const generateTitle = (index: number) => `Mesa ${index + 1}`;
	const generateDescription = (index: number) =>
		`Descrição da Mesa ${index + 1}`;

	const gameSystems: Item[] = systemsJSON.slice(0, 3);

	// Criar 12 Tables distribuídas entre os 3 GameMasters
	const tablesData = Array.from({ length: 12 }, (_, i) => ({
		title: generateTitle(i),
		description: generateDescription(i),
		system: gameSystems[i % gameSystems.length].value,
		gameMasterId: gameMasters[i % gameMasters.length].userUID,
		playerID: [
			players[i % players.length].userUID,
			players[(i + 1) % players.length].userUID,
			players[(i + 2) % players.length].userUID,
		],
	}));

	await Promise.all(
		tablesData.map((table) =>
			prisma.table.create({
				data: table,
			})
		)
	);

	console.log('Seed concluído com sucesso!');
}

main()
	.catch((e) => {
		console.error('Erro no seed:', e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
