App.view.define('main.VForm', 
	{
		extend		: 'Ext.window.Window',
		alias		: 'widget.VForm',
		//x:50,
		//y:50,
		//height: 590, //418
		
		closable	: true,
		draggable	: true,
		resizable	: false,
		closeAction	: 'destroy',
		labelWidth	: 125,
		hidden		: true,
		frame		: false,
		title		: 'Informations sur la demande',
		bodyStyle	: 'padding:5px 5px 0',
		width		: 420,
		bbar		: 
		[		
			'->',
			{
				xtype	: "button",
				itemId	: "btnVFormClose",
				text	: "Sortir"
			}
		],
		/*tbar: 
		[
			{
				xtype	: 'label', // Object text Budget annuel
				itemId	: 'label_budget',
				text	: 'Budget annuel : ',
				margin	:
					{
						//top: 30
						//bottom: 5,
						left: 20
						//right: 10
					}
			},		
			{
				xtype		: "textfield", // Object text Budget annuel
				itemId		: "textfieldbudgetannuel",				
				width		: 70,
				readOnly	: true,
				//fieldLabel: "Budget",
				//labelAlign: "left"
 				margin:
					{
						top: 5,
						bottom: 5,
						left: 20,
						right: 10
					}, 
			},
			{
				xtype	: 'label', // Object text Budget annuel
				itemId	: 'label_budgetannuel',
				text	: 'Budget Actuel : ',
				margin	:
					{
						//top: 30
						//bottom: 5,
						left		: 10
						//right: 10
					}
			},	
			{
				xtype		: "textfield", // Object text Budget actuel
				itemId		: "textfieldbudgetactuel",
				width		: 70,
				readOnly	: true,
				margin:
					{
						top: 22,
						bottom: 5,
						left: 60,
						right: 10
					} 
			},
			{
				xtype	: "label", // Object text Budget actuel
				itemId	: "labelannee",
				text	: 'Année: 2015',
				width	: 64,
				margin	:
					{
						//top: 22,
						//bottom: 5,
						left		: 10
						//right: 10
					}
			}
		],*/
		defaults: 
			{
				width: 420
			},
//====================================
		items: 
			[	
				{
					layout	: "vbox",
					width	: 420,
					margin	: 
						{ 
							top		: -5,
							bottom	: 0,
							left	: -5,
							right	: 0	
						},
					border	: false,
					items	: 
						[

						// ----------- 1ère et 2ème ligne : Département - Service ( début )
						{
								layout	: "vbox",
								itemId	: "vformLigne1et2",
								width	: 400,
								margin	:
									{
										top		: 0,
										bottom	: 0,
										left	: 0,
										right	: 0
									},
								border	: false,
								hidden	: false,
								items	:
									[
										{
											xtype		: "textfield",
											itemId		: "txtfDepartement",
											width		: 370,
											readOnly	: true,
											fieldLabel	: "Département",
											labelAlign	: "top",
											margin		:
												{
													top		: 5,
													bottom	: 5,
													left	: 20,
													right	: 10
												}
										},									
										{
											xtype		: "textfield",
											itemId		: "txtfService",
											width		: 370,
											readOnly	: true,
											fieldLabel	: "Service",
											labelAlign: "top",
											margin		:
												{
													top		: 0,
													bottom	: 5,
													left	: 20,
													right	: 10
												}
										}
									]	
							},
							// ----------- 1 ère et 2ème lignes : Département - Service ( fin )
							// ----------- 3ème ligne : Bénéficiaire - Avancement ( début )
							{
								layout	: "hbox",
								itemId	: "vformLigne3",
								width	: 400,
								margin	:
									{
										top		: 0,
										bottom	: 0,
										left	: 0,
										right	: 0
									},
								border	: false,
								items	:
									[								
										{
											xtype		: "textfield",
											itemId		: "txtfBeneficiaire",
											width		: '50%',
											readOnly	: true,
											fieldLabel	: "Bénéficiaire",
											labelAlign	: "top",
											margin		:
												{
													top		: 0,
													bottom	: 5,
													left	: 20,
													right	: 10
												}
										},
										{
											xtype	: 'progressbar',
											itemId	: 'progbAvancement',
											width	: '50%',
											readOnly: true,
											margin	:
												{
													top		: 19,
													//bottom: 5,
													left	: 12,
													right: 10
												}
										}	
									]	
							},
							// ----------- 3ème ligne : Bénéficiaire - Avancement ( fin )
							// ----------- 4ème ligne : Domaine - Nature ( début )										
							{
								layout	: "hbox",
								itemId	: "vformLigne4",
								width	: 400,
								margin	:
									{
										top		: 0,
										bottom	: 0,
										left	: 0,
										right	: 0
									},
								border	: false,
								items	:
									[
										{
											xtype		: "textfield",
											itemId		: "txtfDomaine",
											width		: '50%',
											readOnly	: true,
											fieldLabel	: "Domaine métier",
											labelAlign	: "top",
											margin		:
												{
													top		: 0,
													bottom	: 5,
													left	: 20,
													right	: 10
												}
										},	
										{
											xtype		: "textfield",
											itemId		: "txtfNature",
											width		: '50%',
											readOnly	: true,
											fieldLabel	: "Nature",
											labelAlign	: "top",
											margin		:
												{
													top		: 0,
													bottom	: 5,
													left	: 20,
													right	: 10
												}
										},					
									]	
							},
							// ----------- 4ème ligne : Domaine - Nature ( fin )
							// ----------- 5ème ligne : Sous nature - Evolution - Qté ( debut )										
							{
								layout	: "hbox",
								itemId	: "vformLigne5",
								width	: 400,
								margin	:
									{
										top		: 0,
										bottom	: 0,
										left	: 0,
										right	: 0
									},
								border	: false,
								items	:
									[			
										{
											xtype		: "textfield",
											itemId		: "txtfSousNature",
											width		: '45%',
											readOnly	: true,
											fieldLabel	: "Sous Nature",
											labelAlign	: "top",
											margin		:
												{
													top		: 5,
													bottom	: 5,
													left	: 20,
													right	: 10
												}
										},	
										{
											xtype		: "textfield",
											itemId		: "txtfEvolution",
											width		: '45%',
											readOnly	: true,
											fieldLabel	: "Evolution",
											labelAlign	: "top",
											margin		:
												{
													top		: 5,
													bottom	: 5,
													left	: 20,
													right	: 10
												}
										},	
										{
											xtype		: "numberfield",
											itemId		: "nmbfQte",
											width		: '10%',
											readOnly	: true,
											fieldLabel	: "Qté",
											labelAlign	: "top",
											margin		:
												{
													top		: 5,
													bottom	: 5,
													left	: 20,
													right	: 10
												}
										},	
									]	
							},
							// ----------- 5ème ligne : Sous nature - Evolution - Qté ( fin )
							// ----------- 6ème ligne : Date de la demande - Prix ( debut )										
							{
								layout	: "hbox",
								itemId	: "vformLigne6",
								width	: 400,
								margin	:
									{
										top		: 0,
										bottom	: 0,
										left	: 0,
										right	: 0
									},
								border	: false,
								items	:
									[			
										{
											xtype		: "datefield",
											itemId		: "datfdatedem",
											width		: '40%',
											readOnly	: true,
											fieldLabel	: "Date de la demande",
											labelAlign	: "top",
											fieldStyle	: 'text-align: center',
											margin		:
												{
													top		: 5,
													bottom	: 5,
													left	: 20,
													right	: 10
												}
										},
										
										{
											xtype		: "numberfield",
											itemId		: "txtfprix",
											width		: '30%',
											readOnly	: true,
											fieldLabel	: "Prix",
											labelAlign	: "top",
											//alwaysDisplayDecimals: true,
											//allowDecimals : false,
											fieldStyle	: 'text-align: center',
											margin		:
												{
													top		: 5,
													bottom	: 5,
													left	: 20,
													right	: 10
												}
										},	
									]	
							},
							// ----------- 6ème ligne : Date de la demande - Prix ( fin )
							// ----------- 7ème et 8ème ligne : Motivation - Détails complémentaires ( debut )										
							{
								layout	: "vbox",
								itemId	: "vformLigne7et8",
								width	: 400,
								margin	:
									{
										top		: 0,
										bottom	: 0,
										left	: 0,
										right	: 0
									},
								border	: false,
								hidden	: false,
								items	:
									[
										{
											xtype		: "textfield",
											itemId		: "txtfmotivation",
											width		: 370,
											readOnly	: true,
											fieldLabel	: "Motivation de la demande",
											labelAlign	: "top",
											margin		:
												{
													top		: 5,
													bottom	: 5,
													left	: 20,
													right	: 10
												}
										},											
										{
											xtype		: "textarea",
											itemId		: "txtalibelledemande",
											width		: 370,
											readOnly	: true,
											fieldLabel	: "Détails complémentaires de la demande",
											labelAlign	: "top",
											margin		:
												{
													top		: 5,
													bottom	: 5,
													left	: 20,
													right	: 10
												}
										}
									]	
							},
							// ----------- 7ème et 8ème ligne : Motivation - Détails complémentaires ( fin )
							// ----------- 9ème ligne : Phasage ( debut )
							{
								layout	: "hbox",
								width	: 400,
								itemId	: "vformLigne9",
								border	: false,
								items:
									[								
										//--- debut radiofield ---
										{
											xtype	: 'label',
											itemId	: 'label_phasage',
											text	: 'Phasage : ',
											width	: 54,
											margin	: 
												{
													left	: 20
												}
										},
										//--- Début zone radio bouton ---
										{ 										
											xtype	: 'radiogroup',
											itemId	: "rdgpriorite",
											flex	: 1,
											// Arrange radio buttons sur 5 columns, vertical
											columns	: 5,
											vertical: true,
											items	: 
												[
													{
														boxLabel	: 'P0',
														itemId		: "RP0",
														name		: 'rb',
														inputValue	: '0',
														readOnly	: true,
														style		: { color: 'red' }
													}, 
													{
														boxLabel	: 'P1',
														itemId		: "RP1",
														name		: 'rb',
														inputValue	: '1',
														readOnly	: true,
														style		: { color: 'orange' }
														
													}, 
													{
														boxLabel	: 'P2',
														itemId		: "RP2",
														name		: 'rb',
														inputValue	: '2',
														readOnly	: true,
														style		: { color: 'green' }
													}, 
													{
														boxLabel	: 'P3',
														itemId		: "RP3",
														name		: 'rb',
														inputValue	: '3',
														readOnly	: true,
														style		: { color: 'purple' },
														checked		: true
													}
												]
										},//--- fin zone radio bouton ---
										//-------------------------
										{
											xtype		: 'checkbox',
											itemId		: "chbspecial",
											readOnly	: true,
											boxLabel	: 'P5 ( Spécial )',
											inputValue	: '1',
											//checked: false,
											margin		:
												{
													top		: 0,
													bottom	: 0,
													left	: 0,
													right	: 12 //10
												},
											style		: { color: 'brown' }
										}
										//-------------------------
									]	
							},
							// ----------- 9ème ligne : Phasage ( fin )
							// ----------- 10ème ligne : Commentaire ( debut )									
							{
								layout	: "hbox",
								itemId	: "vformLigne10",
								width	: 400,
								margin	:
									{
										top		: 0,
										bottom	: 0,
										left	: 0,
										right	: 0
									},
								border	: false,
								items	:
									[								
										{
											xtype		: "textarea",
											itemId		: "txtacommentaire",
											width		: 370,
											readOnly	: true,
											fieldLabel	: "Commentaire / Observation",
											labelAlign	: "top",
											margin	:
												{
													top		: 5,
													bottom	: 5,
													left	: 20,
													right	: 10
												},
										}
									]	
							}
							// ----------- 10ème ligne : Commentaire ( fin )
						]
				}
			]
//====================================
	});