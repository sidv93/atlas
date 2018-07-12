import { Component, OnInit } from '@angular/core';
import Sunburst from 'sunburst-chart';
import { GlobalService } from '../../../global.service';

@Component({
  selector: 'app-files',
  templateUrl: './files.component.html',
  styleUrls: ['./files.component.css']
})
export class FilesComponent implements OnInit {

  public sunBurst;
  constructor(private globalService: GlobalService) {
    this.globalService.productsFetched$.subscribe(
      data => {
        this.ngOnInit();
      }
    );
    this.globalService.changeProduct$.subscribe(
      data => {
        this.ngOnInit();
      }
    );
  }

  ngOnInit() {
    if (this.globalService.productsLoaded) {
      this.makeSunburst();
    }
  }

  public makeSunburst() {
    const color = ['#76889a', '#0c4f76', '#5a91b6', '#166da2', '#2482b8', '#2a98d8', '#7bbdf7', '#add7fa', '#daefff', '#eaf7ff'];
    this.sunBurst = Sunburst();
    const issData =
      {
        'name': 'code',
        'children': [
          {
            'name': 'future',
            'children': [
              {
                'name': 'vrrp',
                'children': [
                  {
                    'name': 'src',
                    'children': [
                      {
                        'name': 'vrrpipif.c'
                      }
                    ]
                  }
                ]
              },
              {
                'name': 'vcm',
                'children': [
                  {
                    'name': 'src',
                    'children': [
                      {
                        'name': 'fsvcmlw.c'
                      },
                      {
                        'name': 'fsvcmwr.c'
                      },
                      {
                        'name': 'vcmcli.c'
                      },
                      {
                        'name': 'vcmnpapi.c'
                      },
                      {
                        'name': 'vcmnpwr.c'
                      },
                      {
                        'name': 'vcmutil.c'
                      }
                    ]
                  },
                  {
                    'name': 'inc',
                    'children': [
                      {
                        'name': 'fsvcmdb.h'
                      },
                      {
                        'name': 'fsvcmlw.h'
                      },
                      {
                        'name': 'fsvcmwr.h'
                      },
                      {
                        'name': 'vcmcmd.def'
                      },
                      {
                        'name': 'vcmtdfs.h'
                      }
                    ]
                  }
                ]
              },
              {
                'name': 'util',
                'children': [
                  {
                    'name': 'nputil',
                    'children': [
                      {
                        'name': 'cfanputil.c'
                      },
                      {
                        'name': 'vcmnputil.c'
                      }
                    ]
                  },
                  {
                    'name': 'cmn',
                    'children': [
                      {
                        'name': 'utilipvx.h'
                      }
                    ]
                  }
                ]
              },
              {
                'name': 'npapi',
                'children': [
                  {
                    'name': 'xcat',
                    'children': [
                      {
                        'name': 'cfanp.c'
                      },
                      {
                        'name': 'vcmnp.c'
                      }
                    ]
                  },
                  {
                    'name': 'wasp',
                    'children': [
                      {
                        'name': 'cfanp.c'
                      }
                    ]
                  },
                  {
                    'name': 'qca',
                    'children': [
                      {
                        'name': 'cfanp.c'
                      }
                    ]
                  },
                  {
                    'name': 'npsim',
                    'children': [
                      {
                        'name': 'clnt',
                        'children': [
                          {
                            'name': 'cfanp.c'
                          },
                          {
                            'name': 'ipnp.c'
                          },
                          {
                            'name': 'vcmnp.c'
                          }
                        ]
                      }
                    ]
                  },
                  {
                    'name': 'mrvlls',
                    'children': [
                      {
                        'name': 'cfanp.c'
                      },
                      {
                        'name': 'vcmnp.c'
                      }
                    ]
                  },
                  {
                    'name': 'lnxwireless',
                    'children': [
                      {
                        'name': 'cfanp.c'
                      }
                    ]
                  },
                  {
                    'name': 'fulcrum',
                    'children': [
                      {
                        'name': 'cfanp.c'
                      },
                      {
                        'name': 'vcmnp.c'
                      }
                    ]
                  },
                  {
                    'name': 'cfanp.c'
                  },
                  {
                    'name': 'vcmnp.c'
                  },
                  {
                    'name': 'bcmx',
                    'children': [
                      {
                        'name': 'bcm631wr.c'
                      },
                      {
                        'name': 'issnp.c'
                      },
                      {
                        'name': 'npvcm.h'
                      },
                      {
                        'name': 'nputils.c'
                      },
                      {
                        'name': 'nputils.h'
                      },
                      {
                        'name': 'npiss.h'
                      },
                      {
                        'name': 'npip6.h'
                      },
                      {
                        'name': 'npip.h'
                      },
                      {
                        'name': 'npcfa.h'
                      },
                      {
                        'name': 'maunp.c'
                      },
                      {
                        'name': 'ipnpx.c'
                      },
                      {
                        'name': 'bcmadd.def'
                      },
                      {
                        'name': 'ipnp.c'
                      },
                      {
                        'name': 'ipmcnp.c'
                      },
                      {
                        'name': 'ip6npx.c'
                      },
                      {
                        'name': 'ip6np.c'
                      },
                      {
                        'name': 'ip6mcnp.c'
                      },
                      {
                        'name': 'igsminp.c'
                      },
                      {
                        'name': 'cfanp.c'
                      },
                      {
                        'name': 'bcmrem.def'
                      },
                      {
                        'name': 'vcmnp.c'
                      }
                    ]
                  },
                  {
                    'name': 'altera',
                    'children': [
                      {
                        'name': 'cfanp.c'
                      },
                      {
                        'name': 'vcmnp.c'
                      }
                    ]
                  }
                ]
              },
              {
                'name': 'netip6',
                'children': [
                  {
                    'name': 'rtm6',
                    'children': [
                      {
                        'name': 'src',
                        'children': [
                          {
                            'name': 'rtm6api.c'
                          },
                          {
                            'name': 'rtm6main.c'
                          },
                          {
                            'name': 'rtm6trie.c'
                          },
                          {
                            'name': 'rtm6util.c'
                          }
                        ]
                      }
                    ]
                  },
                  {
                    'name': 'ip6mgmt',
                    'children': [
                      {
                        'name': 'src',
                        'children': [
                          {
                            'name': 'ip6cli.c'
                          },
                          {
                            'name': 'ipv6npapi.c'
                          }
                        ]
                      }
                    ]
                  },
                  {
                    'name': 'fsip6',
                    'children': [
                      {
                        'name': 'ip6rtr',
                        'children': [
                          {
                            'name': 'ip6fwd.c'
                          }
                        ]
                      },
                      {
                        'name': 'ip6core',
                        'children': [
                          {
                            'name': 'ip6in.c'
                          },
                          {
                            'name': 'ip6main.c'
                          },
                          {
                            'name': 'nd6main.c'
                          }
                        ]
                      }
                    ]
                  }
                ]
              },
              {
                'name': 'netip',
                'children': [
                  {
                    'name': 'rtm',
                    'children': [
                      {
                        'name': 'src',
                        'children': [
                          {
                            'name': 'rtmapi.c'
                          },
                          {
                            'name': 'rtmintf.c'
                          },
                          {
                            'name': 'rtmprt.c'
                          },
                          {
                            'name': 'rtmred.c'
                          },
                          {
                            'name': 'rtmstb.c'
                          },
                          {
                            'name': 'rtmtmrif.c'
                          },
                          {
                            'name': 'rtmtrie.c'
                          },
                          {
                            'name': 'rtmtskmg.c'
                          }
                        ]
                      },
                      {
                        'name': 'inc',
                        'children': [
                          {
                            'name': 'rtmprots.h'
                          },
                          {
                            'name': 'rtmtdfs.h'
                          }
                        ]
                      }
                    ]
                  },
                  {
                    'name': 'ipmgmt',
                    'children': [
                      {
                        'name': 'src',
                        'children': [
                          {
                            'name': 'ipnpapi.c'
                          }
                        ]
                      }
                    ]
                  },
                  {
                    'name': 'fsip',
                    'children': [
                      {
                        'name': 'ip',
                        'children': [
                          {
                            'name': 'src',
                            'children': [
                              {
                                'name': 'iptskmgr.c'
                              }
                            ]
                          }
                        ]
                      }
                    ]
                  }
                ]
              },
              {
                'name': 'l2iwf',
                'children': [
                  {
                    'name': 'src',
                    'children': [
                      {
                        'name': 'l2pkt.c'
                      }
                    ]
                  }
                ]
              },
              {
                'name': 'inc',
                'children': [
                  {
                    'name': 'npapi',
                    'children': [
                      {
                        'name': 'cfanp.h'
                      },
                      {
                        'name': 'ip6np.h'
                      },
                      {
                        'name': 'npapi.h'
                      },
                      {
                        'name': 'vcmnp.h'
                      }
                    ]
                  },
                  {
                    'name': 'cli',
                    'children': [
                      {
                        'name': 'vcmcli.h'
                      }
                    ]
                  },
                  {
                    'name': 'arpnpwr.h'
                  },
                  {
                    'name': 'cfa.h'
                  },
                  {
                    'name': 'cfanpwr.h'
                  },
                  {
                    'name': 'ip.h'
                  },
                  {
                    'name': 'ipnpwr.h'
                  },
                  {
                    'name': 'ipv6.h'
                  },
                  {
                    'name': 'ipv6npwr.h'
                  },
                  {
                    'name': 'nputlremnp.h'
                  },
                  {
                    'name': 'vcm.h'
                  },
                  {
                    'name': 'vcmnpwr.h'
                  },
                  {
                    'name': 'FILEScode',
                    'children': [
                      {
                        'name': 'future',
                        'children': [
                          {
                            'name': 'inc',
                            'children': [
                              {
                                'name': 'FILES.NEW'
                              }
                            ]
                          }
                        ]
                      }
                    ]
                  },
                  {
                    'name': 'wsscf.h'
                  }
                ]
              },
              {
                'name': 'cfa2',
                'children': [
                  {
                    'name': 'src',
                    'children': [
                      {
                        'name': 'cfaapi.c'
                      },
                      {
                        'name': 'cfaiph.c'
                      },
                      {
                        'name': 'cfaipif.c'
                      },
                      {
                        'name': 'cfanpapi.c'
                      },
                      {
                        'name': 'cfanpwr.c'
                      },
                      {
                        'name': 'gddbcmapi.c'
                      }
                    ]
                  }
                ]
              },
              {
                'name': 'arp',
                'children': [
                  {
                    'name': 'src',
                    'children': [
                      {
                        'name': 'arpcache.c'
                      },
                      {
                        'name': 'arpmain.c'
                      },
                      {
                        'name': 'arpnpapi.c'
                      }
                    ]
                  }
                ]
              },
              {
                'name': 'ISS',
                'children': [
                  {
                    'name': 'common',
                    'children': [
                      {
                        'name': 'system',
                        'children': [
                          {
                            'name': 'src',
                            'children': [
                              {
                                'name': 'isscli.c'
                              },
                              {
                                'name': 'isscust.c'
                              }
                            ]
                          }
                        ]
                      }
                    ]
                  }
                ]
              },
              {
                'name': 'erps',
                'children': [
                  {
                    'name': 'src',
                    'children': [
                      {
                        'name': 'fserpslw.c'
                      }
                    ]
                  }
                ]
              },
              {
                'name': 'snooping',
                'children': [
                  {
                    'name': 'snpcore',
                    'children': [
                      {
                        'name': 'src',
                        'children': [
                          {
                            'name': 'snputil.c'
                          },
                          {
                            'name': 'snpcli.c'
                          },
                          {
                            'name': 'snptmr.c'
                          },
                          {
                            'name': 'snpvlan.c'
                          }
                        ]
                      }
                    ]
                  }
                ]
              },
              {
                'name': 'mpls',
                'children': [
                  {
                    'name': 'te',
                    'children': [
                      {
                        'name': 'src',
                        'children': [
                          {
                            'name': 'tecmnext.c'
                          }
                        ]
                      }
                    ]
                  },
                  {
                    'name': 'mplsrtr',
                    'children': [
                      {
                        'name': 'src',
                        'children': [
                          {
                            'name': 'mpcmnext.c'
                          },
                          {
                            'name': 'mplsport.c'
                          },
                          {
                            'name': 'mpoamif.c'
                          },
                          {
                            'name': 'mpoamrx.c'
                          }
                        ]
                      },
                      {
                        'name': 'inc',
                        'children': [
                          {
                            'name': 'mpoamdef.h'
                          }
                        ]
                      }
                    ]
                  },
                  {
                    'name': 'mplsinc',
                    'children': [
                      {
                        'name': 'teextrn.h'
                      }
                    ]
                  },
                  {
                    'name': 'l2vpn',
                    'children': [
                      {
                        'name': 'src',
                        'children': [
                          {
                            'name': 'l2vpext.c'
                          }
                        ]
                      },
                      {
                        'name': 'inc',
                        'children': [
                          {
                            'name': 'l2vptdfs.h'
                          }
                        ]
                      }
                    ]
                  }
                ]
              },
              {
                'name': 'FILES.INF.ISS'
              },
              {
                'name': 'la',
                'children': [
                  {
                    'name': 'src',
                    'children': [
                      {
                        'name': 'ladlag.c'
                      },
                      {
                        'name': 'ladlagaa.c'
                      },
                      {
                        'name': 'ladlstub.c'
                      },
                      {
                        'name': 'lamclag.c'
                      },
                      {
                        'name': 'lared.c'
                      }
                    ]
                  },
                  {
                    'name': 'inc',
                    'children': [
                      {
                        'name': 'ladlag.h'
                      }
                    ]
                  }
                ]
              },
              {
                'name': 'stp',
                'children': [
                  {
                    'name': 'mstp',
                    'children': [
                      {
                        'name': 'src',
                        'children': [
                          {
                            'name': 'astmpism.c'
                          },
                          {
                            'name': 'astmplow.c'
                          },
                          {
                            'name': 'astmsnmp.c'
                          },
                          {
                            'name': 'astmsys.c'
                          }
                        ]
                      }
                    ]
                  }
                ]
              },
              {
                'name': 'fsb',
                'children': [
                  {
                    'name': 'src',
                    'children': [
                      {
                        'name': 'fsbinit.c'
                      },
                      {
                        'name': 'fsbred.c'
                      },
                      {
                        'name': 'fsbsess.c'
                      },
                      {
                        'name': 'fsbutil.c'
                      }
                    ]
                  },
                  {
                    'name': 'inc',
                    'children': [
                      {
                        'name': 'fsbmacro.h'
                      },
                      {
                        'name': 'fsbprot.h'
                      },
                      {
                        'name': 'fsbtdfs.h'
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      };

    const felixData =
      {
        'name': 'core',
        'children': [
          {
            'name': 'OpenRoadmDeviceMaintenanceUtilV2.java'
          },
          {
            'name': 'OWBCMOperationImpl.java'
          },
          {
            'name': 'AlarmResyncCMOwb.java'
          },
          {
            'name': 'OWBCMControllerImpl.java'
          },
          {
            'name': 'DataStoreOperations.java'
          },
          {
            'name': 'NeJobsGridController.js'
          },
          {
            'name': 'MyJobsDetailsGridController.js'
          },
          {
            'name': 'ShelfViewController.js'
          },
          {
            'name': 'FaultTreeController.js'
          },
          {
            'name': 'CMEquipmentDisplay.java'
          },
          {
            'name': 'TCADetailsController.js'
          },
          {
            'name': 'ClusterStatusHandler.js'
          },
          {
            'name': 'TMVViewController.js'
          },
          {
            'name': 'ClusterStatusController.js'
          },
          {
            'name': 'OrchestratorViewportViewController.js'
          },
          {
            'name': 'RecentAlarmGrid.js'
          },
          {
            'name': 'ActiveNEMaintenanceStore.js'
          },
          {
            'name': 'NetworkOperationHandler.java'
          },
          {
            'name': 'PlannedNetworkPopulationHandler.java'
          },
          {
            'name': 'TCADetailsGrid.js'
          },
          {
            'name': 'NetworkRetrieveHandler.java'
          },
          {
            'name': 'DPMPreferencesViewVController.js'
          },
          {
            'name': 'TopoRefreshDetailsController.js'
          },
          {
            'name': 'LinkPerformanceGridStore.js'
          },
          {
            'name': 'MonitorMainViewController.js'
          },
          {
            'name': 'AlarmsWindowController.js'
          },
          {
            'name': 'InventoryManagerController.js'
          },
          {
            'name': 'TopoRefreshDetails.js'
          },
          {
            'name': 'AlarmStatusDetailsController.js'
          },
          {
            'name': 'SaveFilterComboStore.js'
          },
          {
            'name': 'FMServiceManager.js'
          },
          {
            'name': 'AlarmGridController.js'
          },
          {
            'name': 'FaultServicesAffectedGrid.js'
          },
          {
            'name': 'OpenRoadmInventoryImpl.java'
          },
          {
            'name': 'AjaxSal.js'
          },
          {
            'name': 'PMOprResult.java'
          },
          {
            'name': 'CMAccessImpl.java'
          },
          {
            'name': 'ConfigMgmtNorthBound.java'
          },
          {
            'name': 'shelfView.css'
          },
          {
            'name': 'SNMPTidFilter.js'
          },
          {
            'name': 'SNMPTrapFilterController.js'
          },
          {
            'name': 'SNMPTrapFilter.js'
          },
          {
            'name': 'SNMPTidFilterController.js'
          },
          {
            'name': 'SNMPConditionTypeWindow.js'
          },
          {
            'name': 'SNMPNeTypeWindowController.js'
          },
          {
            'name': 'SNMPNeTypeWindow.js'
          },
          {
            'name': 'SNMPAddTrapFilter.js'
          },
          {
            'name': 'SNMPConditionTypeWindowController.js'
          },
          {
            'name': 'SystemEventGrid.js'
          },
          {
            'name': 'CMServiceManager.js'
          },
          {
            'name': 'NodePropEditWindowVController.js'
          },
          {
            'name': 'optimizeLayout.svg'
          },
          {
            'name': 'ConfigMgmtHelper.js'
          },
          {
            'name': 'InventoryGridController.js'
          },
          {
            'name': 'LinkGridPanelViewController.js'
          },
          {
            'name': 'ServicePropEditWindow.js'
          },
          {
            'name': 'ServicePropEditWindowVController.js'
          },
          {
            'name': 'ServicesGridPanel.js'
          },
          {
            'name': 'ServicesGridPanelViewController.js'
          },
          {
            'name': 'GroupedPropertyGrid.js'
          },
          {
            'name': 'NodePropEditWindow.js'
          },
          {
            'name': 'CytoTopo2DViewController.js'
          },
          {
            'name': 'CytoTopo2DView.js'
          },
          {
            'name': 'AbstractNetSvcConsumer.java'
          },
          {
            'name': 'pom.xml'
          },
          {
            'name': 'OWBCMConstants.java'
          },
          {
            'name': 'all.json'
          },
          {
            'name': 'all.json1'
          },
          {
            'name': 'all.json2'
          },
          {
            'name': 'all.json3'
          },
          {
            'name': 'all.json4'
          },
          {
            'name': 'all_html.json'
          },
          {
            'name': 'swagger.json'
          },
          {
            'name': 'ZTPCMOperation.java'
          },
          {
            'name': 'InventoryTabPanel.js'
          },
          {
            'name': 'InventoryTabPanelController.js'
          },
          {
            'name': 'FacilityTemplateSummary.js'
          },
          {
            'name': 'SNMPEdit.js'
          },
          {
            'name': 'sysadmin.css'
          },
          {
            'name': 'MyJobsDetailsGrid.js'
          },
          {
            'name': 'PendingJobsGrid.js'
          },
          {
            'name': 'PendingJobsGridController.js'
          },
          {
            'name': 'SystemEventStore.js'
          },
          {
            'name': 'SystemEventModel.js'
          },
          {
            'name': 'framework.css'
          },
          {
            'name': 'ShelfTreeController.js'
          },
          {
            'name': 'PerfMgmtNorthBound.java'
          },
          {
            'name': 'FacilityGridController.js'
          },
          {
            'name': 'ServiceTree.js'
          },
          {
            'name': 'ServiceTreeController.js'
          },
          {
            'name': 'ModellingUtils.java'
          },
          {
            'name': 'Protocols.java'
          },
          {
            'name': 'PhysicalLink.java'
          },
          {
            'name': 'ProtocolsInput.java'
          },
          {
            'name': 'PhysicalLinkInput.java'
          },
          {
            'name': 'SNMPEditController.js'
          },
          {
            'name': 'OperationGridController.js'
          },
          {
            'name': 'OpertationWindowController.js'
          },
          {
            'name': 'EquipmentTemplateController.js'
          },
          {
            'name': 'EquipmentTemplate.js'
          },
          {
            'name': 'TopoCommonNorthBound.java'
          },
          {
            'name': 'TopoOTNNorthBound.java'
          },
          {
            'name': 'TopoWDMNorthBound.java'
          },
          {
            'name': 'FaultAcknowledgeController.js'
          },
          {
            'name': 'UIConfigMap.js'
          },
          {
            'name': 'UIConfiguration.json'
          },
          {
            'name': 'AlarmsWindow.js'
          },
          {
            'name': 'OperationWindow.js'
          },
          {
            'name': 'NEMaintenanceDetails.js'
          },
          {
            'name': 'NEMaintenanceDetailsController.js'
          },
          {
            'name': 'TopoModuleView.js'
          },
          {
            'name': 'TCDetailsGrid.js'
          },
          {
            'name': 'GroupCreationWindow.js'
          },
          {
            'name': 'LinkCreationCViewController.js'
          },
          {
            'name': 'TopoResyncWViewController.js'
          },
          {
            'name': 'TopoResyncWindow.js'
          },
          {
            'name': 'VNCClusterStatusModel.js'
          },
          {
            'name': 'AlarmStatusDetails.js'
          },
          {
            'name': 'ServiceColorForm.js'
          },
          {
            'name': 'SystemNotificationForm.js'
          },
          {
            'name': 'login.js'
          },
          {
            'name': 'CytoTopo2DBaseView.js'
          },
          {
            'name': 'swagger_jaxrsanalyzer.json'
          },
          {
            'name': 'AbstractOpenRoadmNB.java'
          },
          {
            'name': 'combinejson.py'
          },
          {
            'name': 'OpenRoadmNorthBound.java'
          },
          {
            'name': 'OpenRoadmSvcConsumerIfc.java'
          },
          {
            'name': 'blueprint.xml'
          },
          {
            'name': 'OpenRoadmSvcConsumerImpl.java'
          },
          {
            'name': 'OpenRoadmSvcMaintenanceNB.java'
          },
          {
            'name': 'AbsOpenRoadmSvcConsumer.java'
          },
          {
            'name': 'MyTaskGridController.js'
          },
          {
            'name': 'EmfOpenRoadmRestService.java'
          },
          {
            'name': 'neJobsGrid.js'
          },
          {
            'name': 'cmmgmt.css'
          },
          {
            'name': 'PerformanceTemplateHelper.js'
          },
          {
            'name': 'PendingJobsDetailsController.js'
          },
          {
            'name': 'AdvancedSvcLinearView.js'
          },
          {
            'name': 'AdvSvcLinearVViewController.js'
          },
          {
            'name': 'CytoOverlayCreation2DView.js'
          },
          {
            'name': 'index.html'
          },
          {
            'name': 'AlarmCountBannerController.js'
          },
          {
            'name': 'NEMaintenanceListStore.js'
          },
          {
            'name': 'ShelfDetailsController.js'
          },
          {
            'name': 'PhysicalInventoryGridController.js'
          },
          {
            'name': 'Constants.java'
          },
          {
            'name': 'OWBDBChangeEventHandler.java'
          },
          {
            'name': 'MyJobsDetailsModel.js'
          },
          {
            'name': 'card_unassigned.png'
          },
          {
            'name': 'ShelfTree.js'
          },
          {
            'name': 'pieChart.js'
          },
          {
            'name': 'donutChart.js'
          },
          {
            'name': 'PerformanceGrid.js'
          },
          {
            'name': 'PerformanceGridController.js'
          },
          {
            'name': 'Licenses3rdParty.json'
          },
          {
            'name': 'SysAdminNav.json'
          },
          {
            'name': 'MyJobsIDDetailsController.js'
          },
          {
            'name': 'AddMoreNEsGridController.js'
          },
          {
            'name': 'MyTaskGrid.js'
          },
          {
            'name': 'MyTasksModel.js'
          },
          {
            'name': 'NetSvcConsumerImpl.java'
          },
          {
            'name': 'AlarmStorage.java'
          },
          {
            'name': 'AlarmProcessCM.java'
          },
          {
            'name': 'AlarmMgmtCMOwb.java'
          },
          {
            'name': 'KafkaServer.java'
          },
          {
            'name': 'TopologyConsumerNBImpl.java'
          },
          {
            'name': 'ComponentData.java'
          },
          {
            'name': 'CMAccessImplUtil.java'
          },
          {
            'name': 'RoadmConnection.java'
          },
          {
            'name': 'OpenRoadmDeviceNBV2.java'
          },
          {
            'name': 'SharedRiskGroup.java'
          },
          {
            'name': 'McTtpInputM.java'
          },
          {
            'name': 'OpenroadmDeviceInput.java'
          },
          {
            'name': 'OpenRoadmDeviceIfc.java'
          },
          {
            'name': 'refreshIcon.svg'
          },
          {
            'name': 'MonitorMainView.js'
          },
          {
            'name': 'RingsStore.js'
          },
          {
            'name': 'PMBaselineController.js'
          },
          {
            'name': 'PMBaselineDetails.js'
          },
          {
            'name': 'FLASHWAVE-9500.json'
          },
          {
            'name': 'FLASHWAVE-9500-SLOTS.json'
          },
          {
            'name': 'Flashwave-9500-Slots.js'
          },
          {
            'name': 'LinkSelectionView.js'
          },
          {
            'name': 'ServicesActivationViewController.js'
          },
          {
            'name': 'sencha-error-20180131.log'
          },
          {
            'name': 'Topo2DViewViewController.js'
          },
          {
            'name': 'Topo2DView.js'
          },
          {
            'name': 'ServiceTabPanelController.js'
          },
          {
            'name': 'LinkLinearViewController.js'
          },
          {
            'name': 'monitor.css'
          },
          {
            'name': 'PacketServiceAttributesController.js'
          },
          {
            'name': 'PacketServiceTemplate.js'
          },
          {
            'name': 'PacketServiceTemplateController.js'
          },
          {
            'name': 'ConfigMgmtConstants.js'
          },
          {
            'name': 'ServiceUIConstants.js'
          },
          {
            'name': 'LinkLinearViewHelper.js'
          },
          {
            'name': 'CommonHelper.js'
          },
          {
            'name': '1FINITY-S100.json'
          },
          {
            'name': 'ServicesCreatePanelPacketViewController.js'
          },
          {
            'name': 'ServicesCreatePanelPacket.js'
          },
          {
            'name': 'EndpointsModel.js'
          },
          {
            'name': 'PacketServiceAttributes.js'
          },
          {
            'name': 'AuditServiceImpl.java'
          },
          {
            'name': 'CytoGraphStyleSheet.json'
          }
        ]
      }

    document.getElementById('chartContainer').innerHTML = null;
    const myChart = Sunburst();
    myChart.data(this.globalService.product.productName === 'ISS' ? issData : felixData)
      .size(1)
      .label('name')
      .height('500')
      .color(() => color[(Math.random() * 10).toPrecision(1)])
      (document.getElementById('chartContainer'));

  }
}
