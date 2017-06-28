db.getCollection('feature').insertMany([
  {
    'sId': '10020',
    'sNumber': 'PIT05-47',
    'sName': '[ISW] Build failure rate',
    'sTypeName': 'Feature',
    'sStatus': 'Backlog',
    'dEstimate': 3,
    'sSprintID': '1225',
    'sSprintName': 'PROGRAM_INCREMENT_SP4',
    'sSprintAssetState': 'ACTIVE',
    'sprintBeginDate': ISODate('2017-03-21T22:00:50.3050000'),
    'sprintEndDate': ISODate('2017-04-04T22:00:00.0000000'),
    'sProjectId': null,
    'sProjectName': 'ProgramIncrement',
    'sPiNames': ['PI02'],
    'keywords': [
          'program-increment'
        ]
  },
  {
    'sId': '10021',
    'sNumber': 'PIT05-47',
    'sName': 'SPIKE: Analyze the cost of migrating',
    'sTypeName': 'Feature',
    'sStatus': 'Backlog',
    'dEstimate': 3,
    'sSprintID': '1225',
    'sSprintName': 'PROGRAM_INCREMENT_SP4',
    'sSprintAssetState': 'ACTIVE',
    'sprintBeginDate': ISODate('2017-03-21T22:00:50.3050000'),
    'sprintEndDate': ISODate('2017-04-04T22:00:00.0000000'),
    'sProjectId': null,
    'sProjectName': 'ProgramIncrement',
    'sPiNames': ['PI01'],
        'keywords': [
              'ProgramIncrement'
            ]
  },
  {
    'sId': '10022',
    'sNumber': 'PIT05-47',
    'sName': 'Login',
    'sTypeName': 'Feature',
    'sStatus': 'Active',
    'dEstimate': 8,
    'sSprintID': '1225',
    'sSprintName': 'PROGRAM_INCREMENT_SP4',
    'sSprintAssetState': 'ACTIVE',
    'sprintBeginDate': ISODate('2017-03-21T22:00:50.3050000'),
    'sprintEndDate': ISODate('2017-04-04T22:00:00.0000000'),
    'sProjectId': null,
    'sProjectName': 'ProgramIncrement',
    'sPiNames': ['PI01','PI02'],
        'keywords': [
              'program-increment'
            ]
  },
  {
    'sId': '10023',
    'sNumber': 'PIT05-48',
    'sName': 'Login',
    'sTypeName': 'Story',
    'sStatus': 'Active',
    'dEstimate': 8,
    'sSprintID': '1225',
    'sSprintName': 'PROGRAM_INCREMENT_SP4',
    'sSprintAssetState': 'ACTIVE',
    'sprintBeginDate': ISODate('2017-03-21T22:00:50.3050000'),
    'sprintEndDate': ISODate('2017-04-04T22:00:00.0000000'),
    'sProjectId': null,
    'sParentKey': 'PIT05-47',
    'sProjectName': 'ProgramIncrement',
    'sPiNames': ['PI01','PI02'],
        'keywords': [
              'program-increment'
            ]
  }
]);
