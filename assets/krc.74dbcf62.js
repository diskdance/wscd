const e="\u0412\u0438\u043A\u0438\u043C\u0435\u0434\u0438\u0430 \u0421\u0435\u0440\u0432\u0435\u0440 \u0411\u0430\u0439\u043B\u0430\u043D\u044B\u0443 \u041F\u0430\u043D\u0435\u043B\u044C",i="\u{1F552} \u0421\u0430\u043A\u044A\u043B\u0430\u0439\u0434\u044B...",a="\u{1F50D} \u0422\u0438\u043D\u0442\u0438\u043B\u0435 \u0442\u0443\u0440\u0430\u0434\u044B\u2026",n={"name-species.wikimedia.org":"\u0412\u0438\u043A\u0438\u0442\u044E\u0440\u043B\u0435","name-wikitech-static.wikimedia.org":"\u0412\u0438\u043A\u0438\u0442\u0435\u0445 (\u0420\u0435\u0437\u0435\u0440\u0432 \u043A\u043E\u043F\u0438\u044F)","name-ar.planet.wikimedia.org":"\u0410\u0440\u0430\u0431\u0447\u0430 \u0412\u0438\u043A\u0438\u043C\u0435\u0434\u0438\u0430 \u041F\u043B\u0430\u043D\u0435\u0442\u0430","name-bg.planet.wikimedia.org":"\u0411\u043E\u043B\u0433\u0430\u0440\u0447\u0430 \u0412\u0438\u043A\u0438\u043C\u0435\u0434\u0438\u0430 \u041F\u043B\u0430\u043D\u0435\u0442\u0430","name-cs.planet.wikimedia.org":"\u0427\u0435\u0445\u0447\u0430 \u0412\u0438\u043A\u0438\u043C\u0435\u0434\u0438\u0430 \u041F\u043B\u0430\u043D\u0435\u0442\u0430","name-de.planet.wikimedia.org":"\u041D\u0435\u043C\u0435\u0446\u0447\u0430 \u0412\u0438\u043A\u0438\u043C\u0435\u0434\u0438\u0430 \u041F\u043B\u0430\u043D\u0435\u0442\u0430","name-el.planet.wikimedia.org":"\u0423\u0440\u0443\u043C\u0447\u0430 \u0412\u0438\u043A\u0438\u043C\u0435\u0434\u0438\u0430 \u041F\u043B\u0430\u043D\u0435\u0442\u0430","name-en.planet.wikimedia.org":"\u0418\u043D\u0433\u0438\u043B\u0438\u0437\u0447\u0430 \u0412\u0438\u043A\u0438\u043C\u0435\u0434\u0438\u0430 \u041F\u043B\u0430\u043D\u0435\u0442\u0430","name-es.planet.wikimedia.org":"\u0418\u0441\u043F\u0430\u043D\u0447\u0430 \u0412\u0438\u043A\u0438\u043C\u0435\u0434\u0438\u0430 \u041F\u043B\u0430\u043D\u0435\u0442\u0430","name-fr.planet.wikimedia.org":"\u0424\u0440\u0430\u043D\u0446\u0443\u0437\u0447\u0430 \u0412\u0438\u043A\u0438\u043C\u0435\u0434\u0438\u0430 \u041F\u043B\u0430\u043D\u0435\u0442\u0430","name-gmq.planet.wikimedia.org":"\u0421\u043A\u0430\u043D\u0434\u0438\u043D\u0430\u0432\u0447\u0430 \u0412\u0438\u043A\u0438\u043C\u0435\u0434\u0438\u0430 \u041F\u043B\u0430\u043D\u0435\u0442\u0430","name-id.planet.wikimedia.org":"\u0418\u043D\u0434\u043E\u043D\u0435\u0437\u0438\u0439\u0447\u0430 \u0412\u0438\u043A\u0438\u043C\u0435\u0434\u0438\u0430 \u041F\u043B\u0430\u043D\u0435\u0442\u0430","name-it.planet.wikimedia.org":"\u0418\u0442\u0430\u043B\u044C\u044F\u043D\u0447\u0430 \u0412\u0438\u043A\u0438\u043C\u0435\u0434\u0438\u0430 \u041F\u043B\u0430\u043D\u0435\u0442\u0430","name-pl.planet.wikimedia.org":"\u041F\u043E\u043B\u044F\u043A\u0447\u0430 \u0412\u0438\u043A\u0438\u043C\u0435\u0434\u0438\u0430 \u041F\u043B\u0430\u043D\u0435\u0442\u0430","name-pt.planet.wikimedia.org":"\u041F\u043E\u0440\u0442\u0443\u0433\u0430\u043B\u0447\u0430 \u0412\u0438\u043A\u0438\u043C\u0435\u0434\u0438\u0430 \u041F\u043B\u0430\u043D\u0435\u0442\u0430","name-ro.planet.wikimedia.org":"\u0420\u0443\u043C\u044B\u043D\u0447\u0430 \u0412\u0438\u043A\u0438\u043C\u0435\u0434\u0438\u0430 \u041F\u043B\u0430\u043D\u0435\u0442\u0430","name-ru.planet.wikimedia.org":"\u041E\u0440\u0443\u0441\u0447\u0430 \u0412\u0438\u043A\u0438\u043C\u0435\u0434\u0438\u0430 \u041F\u043B\u0430\u043D\u0435\u0442\u0430","name-sq.planet.wikimedia.org":"\u0410\u043B\u0431\u0430\u043D\u0447\u0430 \u0412\u0438\u043A\u0438\u043C\u0435\u0434\u0438\u0430 \u041F\u043B\u0430\u043D\u0435\u0442\u0430","name-uk.planet.wikimedia.org":"\u0423\u043A\u0440\u0430\u0438\u043D\u0447\u0430 \u0412\u0438\u043A\u0438\u043C\u0435\u0434\u0438\u0430 \u041F\u043B\u0430\u043D\u0435\u0442\u0430","name-zh.planet.wikimedia.org":"\u041A\u044A\u044B\u0442\u0430\u0439\u0447\u0430 \u0412\u0438\u043A\u0438\u043C\u0435\u0434\u0438\u0430 \u041F\u043B\u0430\u043D\u0435\u0442\u0430","name-upload.wikimedia.org":"\u0412\u0438\u043A\u0438\u043C\u0435\u0434\u0438\u0430 \u041C\u0435\u0434\u0438\u0430 \u0421\u0430\u043A\u044A\u043B\u0430\u0443 \u0414\u0436\u0435\u0440","name-wikimediafoundation.org":"\u0412\u0438\u043A\u0438\u043C\u0435\u0434\u0438\u0430 \u0424\u043E\u043D\u0434","name-phabricator.wikimedia.org":"\u0412\u0438\u043A\u0438\u043C\u0435\u0434\u0438\u0430 \u0424\u0430\u0431\u0440\u0438\u043A\u0430\u0442\u043E\u0440","name-gerrit.wikimedia.org":"\u0412\u0438\u043A\u0438\u043C\u0435\u0434\u0438\u0430 \u041A\u043E\u0434 \u0422\u0438\u043D\u0442\u0438\u0443","name-gitlab.wikimedia.org":"\u0412\u0438\u043A\u0438\u043C\u0435\u0434\u0438\u0430 GitLab","name-ticket.wikimedia.org":"\u0412\u043E\u043B\u043E\u043D\u0442\u0451\u0440 \u0411\u043E\u043B\u0443\u0448\u043B\u0443\u043A\u044A \u041A\u043E\u043C\u0430\u043D\u0434\u0430","name-idp.wikimedia.org":"\u0412\u0438\u043A\u0438\u043C\u0435\u0434\u0438\u0430 \u041B\u0430\u0433\u044A\u044B\u043C\u0447\u044B\u043B\u0430\u0433\u044A\u0430 \u0411\u0438\u0440\u0438\u043A\u0433\u0435\u043D \u041A\u0438\u0440\u0438\u0443","name-dumps.wikimedia.org":"\u0412\u0438\u043A\u0438\u043C\u0435\u0434\u0438\u0430 \u042D\u043D\u0434\u0438\u0440\u0438\u0443\u043B\u0435","name-lists.wikimedia.org":"\u0412\u0438\u043A\u0438\u043C\u0435\u0434\u0438\u0430 \u041F\u043E\u0447\u0442\u0430 \u0422\u0438\u0437\u043C\u0435\u043B\u0435","name-diff.wikimedia.org":"Diff \u0411\u043B\u043E\u0433","name-techblog.wikimedia.org":"\u0412\u0438\u043A\u0438\u043C\u0435\u0434\u0438\u0430 \u0422\u0435\u0445\u043D\u043E\u0431\u043B\u043E\u0433","name-wikimedia.org":"\u0412\u0438\u043A\u0438\u043C\u0435\u0434\u0438\u0430 \u041F\u043E\u0440\u0442\u0430\u043B","name-wikipedia.org":"\u0412\u0438\u043A\u0438\u043F\u0435\u0434\u0438\u044F \u041F\u043E\u0440\u0442\u0430\u043B","name-wiktionary.org":"\u0412\u0438\u043A\u0438\u0441\u0451\u0437\u043B\u044E\u043A \u041F\u043E\u0440\u0442\u0430\u043B","name-wikibooks.org":"\u0412\u0438\u043A\u0438\u043A\u0438\u0442\u0430\u0431 \u041F\u043E\u0440\u0442\u0430\u043B","name-wikinews.org":"\u0412\u0438\u043A\u0438\u0434\u0436\u0430\u043D\u0433\u044B\u043B\u044B\u043A\u044A\u043B\u0430 \u041F\u043E\u0440\u0442\u0430\u043B","name-wikiquote.org":"\u0412\u0438\u043A\u0438\u0441\u0451\u0437 \u041F\u043E\u0440\u0442\u0430\u043B","name-wikiversity.org":"\u0412\u0438\u043A\u0438\u0432\u0435\u0440\u0441\u0438\u0442\u0435\u0442 \u041F\u043E\u0440\u0442\u0430\u043B","name-wikivoyage.org":"\u0412\u0438\u043A\u0438\u0434\u0436\u043E\u043B\u043E\u0443\u0447\u0443\u043B\u0443\u043A\u044A \u041F\u043E\u0440\u0442\u0430\u043B","name-w.wiki":"\u0412\u0438\u043A\u0438\u043C\u0435\u0434\u0438\u0430 URL \u043A\u044A\u044B\u0441\u0445\u0430\u0440\u0442\u044B\u0443\u0447\u0443",title:e,"title-abbr":"wscd","card-err-head":"\u0425\u0430\u043B\u0430\u0442 \u0431\u043E\u043B\u0434\u0443","card-err-desc":"\u0411\u0443\u043D\u0443 \u0447\u0443\u0440\u0443\u043C\u0443, \u0442\u0438\u043D\u0442\u0438\u0443\u043D\u044E \u044D\u0442\u0435\u0440 \u044E\u0447\u044E\u043D \u043A\u0435\u0440\u0435\u043A \u0442\u0430\u043C\u0430\u043B \u043A\u044A\u0430\u0439\u043D\u0430\u043A\u044A\u043B\u0430\u043D\u044B \u044D\u043D\u0434\u0438\u0440\u0438\u043B\u043C\u0435\u043C\u0435\u0441\u0438 \u0431\u043E\u043B\u0443\u0440\u0433\u044A\u0430 \u0431\u043E\u043B\u0443\u0440. \u0422\u0438\u043B\u0435\u0439\u0431\u0438\u0437 \u0430\u0443\u0433\u044A\u0430 \u0431\u0430\u0439\u043B\u0430\u043C\u044B\u0433\u044A\u044B\u0437\u043D\u044B \u043A\u043E\u043D\u0442\u0440\u043E\u043B\u044C \u044D\u0442\u0438\u0433\u0438\u0437.","card-about-head":"\u0411\u0443 \u0430\u0434\u044B\u0440\u043D\u044B \u044E\u0441\u044E\u043D\u0434\u0435\u043D","card-about-desc-1":"\u0412\u0438\u043A\u0438\u043C\u0435\u0434\u0438\u0430 \u0421\u0435\u0440\u0432\u0435\u0440 \u0411\u0430\u0439\u043B\u0430\u043D\u044B\u0443 \u041F\u0430\u043D\u0435\u043B\u044C \u043A\u0435\u0441\u0438\u0433\u0438\u0437\u043D\u0438 \u0430\u0443\u0443\u0443\u0433\u044A\u0443\u0437\u0434\u0430\u043D \u0412\u0438\u043A\u0438\u043C\u0438\u0435\u0434\u0438\u0430 \u043F\u0440\u043E\u0435\u043A\u0442\u043B\u0435\u0433\u0435 \u043A\u0438\u0440\u0438\u0440\u0433\u0435 \u044D\u043C\u0434\u0430 \u0442\u044E\u0437\u0435\u0442\u0438\u0440\u0433\u0435 \u043C\u0430\u0434\u0430\u0440\u044B\u0433\u044A\u044B\u0437 \u0431\u043E\u043B\u0433\u044A\u0430\u043D\u043D\u044B \u0442\u0438\u043D\u0442\u0435\u0434\u0438.","card-about-desc-2":"\u0418\u0448\u043B\u0435\u043C\u0435\u0433\u0435\u043D \u0430\u0443\u043B\u0430 \u044E\u0447\u044E\u043D, \u043A\u043E\u043C\u043F\u0430\u043D\u0438\u044F\u043D\u044B \u0430\u0443 \u043F\u043E\u043B\u0438\u0442\u0438\u043A\u0430 \u043D\u0435\u0434\u0430 \u043A\u044A\u0440\u0430\u043B \u0446\u0435\u043D\u0437\u0443\u0440\u0430 \u044E\u0447\u044E\u043D \u0431\u0430\u0439\u043B\u0430\u043C\u0434\u0430 \u0431\u0443\u0437\u0443\u043A\u044A \u0431\u043E\u043B\u0443\u0440\u0433\u044A\u0430 \u0431\u043E\u043B\u043B\u0443\u043A\u044A\u0434\u0443.","card-about-desc-3":"IP-\u0430\u0434\u0440\u0435\u0441\u043B\u0435\u043D\u0438 \u0431\u043B\u043E\u043A \u044D\u0442\u0438\u0443\u044E \u043F\u0440\u043E\u043A\u0441\u0438-\u0441\u0435\u0440\u0432\u0435\u0440 \u043D\u0435\u0434\u0430 VPN \u043A\u044A\u0443\u043B\u043B\u0443\u043A\u044A \u0445\u0430\u0439\u044B\u0440\u043B\u0430\u043D\u043D\u0433\u0430\u043D\u044B\u0433\u044A\u044B\u0437 \u0431\u0430\u0439\u043B\u0430\u043C\u043B\u044B \u0431\u043E\u043B\u0443\u0440\u0433\u044A\u0430 \u0431\u043E\u043B\u0443\u0440. \u0412\u0430\u043D\u0434\u0430\u043B\u043B\u044B\u043A\u044A\u043D\u044B \u0430\u043B\u043B\u044B\u043D \u0442\u044B\u044F\u0440 \u044E\u0447\u044E\u043D, \u0412\u0438\u043A\u0438\u043C\u0435\u0434\u0438\u0430 IP-\u0430\u0434\u0440\u0435\u0441\u043B\u0435\u043D\u0438 \u043F\u0440\u043E\u043A\u0441\u0438\u0441\u0438\u043D \u0442\u044E\u0437\u0435\u0442\u0438\u0443\u043D\u044E \u0431\u043B\u043E\u043A \u044D\u0442\u0433\u0435\u043D\u0434\u0438. \u041A\u0435\u0441\u0438\u0433\u0438\u0437\u043D\u0438 \u0445\u044B\u0439\u0441\u0430\u0431\u044B\u0433\u044A\u044B\u0437\u0433\u044A\u0430, \u0431\u044B\u043B\u043B\u0430\u0439 \u0434\u0436\u043E\u0440\u0443\u043A\u044A \u0431\u0443\u0437\u0443\u0443\u043B\u0430\u0433\u044A\u0430\u0434\u0430\u043D \u043A\u044A\u0430\u0447\u0430\u0440 \u044E\u0447\u044E\u043D [https://en.wikipedia.org/wiki/Wikipedia:IP_block_exemption IP \u0431\u043B\u043E\u043A\u0434\u0430\u043D \u0431\u043E\u0448 \u0431\u043E\u043B\u0443\u0443 \u044D\u0440\u043A\u0438\u043D\u043B\u0438\u043A \u0442\u0438\u043B\u0435\u0440\u0433\u0435] \u0431\u043E\u043B\u043B\u0443\u043A\u044A\u0441\u0443\u0437.","tbl-h-name":"\u0410\u0442\u043B\u0430","tbl-h-domains":"\u0414\u043E\u043C\u0435\u043D\u043B\u0435","tbl-h-available":"\u041A\u0438\u0440\u0438\u0448\u043B\u0438\u043C\u0438\u0434\u0438?","tbl-h-conn":"\u0411\u0430\u0439\u043B\u0430\u043C\u043B\u044B\u043A\u044A","tbl-h-block":"\u0422\u044E\u0437\u0435\u0442\u0438\u0440\u0447\u0430\u043C\u044B\u0434\u044B?","tbl-btn-jts":"\u0410\u043B\u043B\u044B\u043D\u0430 \u043A\u0451\u0447","tbl-btn-jte":"\u0410\u0445\u044B\u0440\u044B\u043D\u0430 \u043A\u0451\u0447","tbl-btn-next":"\u042D\u043D\u0434\u0438\u0433\u0438 \u0431\u0435\u0442","tbl-btn-prev":"\u0410\u043B\u043B\u044B\u043D\u0434\u0430\u0433\u044A\u044B \u0431\u0435\u0442","tbl-page-info":"$1-$2/$3","footer-badge-alt":"Toolforge \u043A\u044E\u0447\u044E \u0431\u043B\u0430","footer-code":"\u041A\u044A\u0430\u0439\u043D\u0430\u043A\u044A \u043A\u043E\u0434","footer-license":"\u041B\u0438\u0446\u0435\u043D\u0437\u0438\u044F","header-slogan":"\u042D\u0440\u043A\u0438\u043D \u0431\u0438\u043B\u0438\u043C\u043B\u0435\u0434\u0435\u043D \u043D\u0435 \u043A\u044A\u0430\u0434\u0430\u0440 \u0443\u0437\u0430\u043A\u044A\u0434\u0430\u0441\u044B\u0437?","name-key-missing":"(\u0411\u0438\u043B\u0438\u043D\u043C\u0435\u0433\u0435\u043D)","avl-yes":"\u2714\uFE0F \u041A\u0438\u0440\u0438\u0448\u043B\u0438\u0434\u0438","avl-no":"\u274C \u041A\u0438\u0440\u0438\u0448\u0441\u0438\u0437\u0434\u0438","blk-yes":"\u{1F6AB} \u0411\u043B\u043E\u043A \u044D\u0442\u0438\u043B\u0438\u0431\u0434\u0438","blk-no":"\u2714\uFE0F \u0422\u044E\u0437\u0435\u0442\u0438\u0440\u0447\u0430\u0434\u044B","blk-unknown":"\u2754 \u0411\u0438\u043B\u0438\u043D\u043C\u0435\u0439\u0434\u0438","blk-non-wiki":"\u2714\uFE0F \u0412\u0438\u043A\u0438 \u0442\u044E\u043B\u0434\u044E",pending:i,checking:a,"rtt-excellent":"\u26A1 \u0410\u043B\u0430\u043C\u0430\u0442","rtt-good":"\u{1F680} \u0418\u0433\u0438","rtt-bad":"\u{1F40C} \u0418\u0433\u0438 \u0442\u044E\u043B\u0434\u044E","rtt-title":"$1 \u043C\u0441","ct-field-ext-check":"\u0411\u044E\u0442\u0435\u0443 \u0441\u0430\u0439\u0442\u043B\u0430\u043D\u044B \u0442\u0438\u043D\u0442\u0438\u0433\u0438\u0437","ct-field-type":"\u0422\u0438\u043D\u0442\u0438\u0443\u043D\u044E \u0442\u0438\u043F\u0438","ct-field-std":"\u0410\u0439\u0442\u0445\u044B\u043B\u044B \u0441\u0430\u0439\u0442\u043B\u0430","ct-field-ext":"\u0411\u044E\u0442\u0435\u0443 \u0441\u0430\u0439\u0442\u043B\u0430","btn-chk":"\u0422\u0438\u043D\u0442","sc-chk-h":"\u0422\u0438\u043D\u0442\u0438\u0443... ($1/$2)","sc-chk-h-err":"\u0422\u0430\u043B\u0430\u0439 \u043F\u0440\u043E\u0431\u043B\u0435\u043C\u0430 \u0442\u0430\u0431\u044B\u043B\u0433\u044A\u0430\u043D\u0434\u044B. \u0422\u0438\u043D\u0442\u0435 \u0442\u0443\u0440\u0430\u0434\u044B... ($1/$2)","sc-chk-desc":"\u0410\u0443\u0443\u0433\u044A\u0443\u0437\u043D\u0443 \u0431\u043E\u043B\u0443\u043C\u0443\u043D\u0430 \u043A\u0451\u0440\u0435, \u0442\u0430\u043B\u0430\u0439 \u0442\u0430\u043A\u044A\u0438\u0439\u043A\u044A\u0430 \u0430\u043B\u044B\u0440\u0433\u044A\u0430 \u0431\u043E\u043B\u043B\u0443\u043A\u044A\u0434\u0443.","sc-chk-cur":"\u0411\u0443\u0441\u0430\u0433\u044A\u0430\u0442\u0434\u0430 \u0442\u0438\u043D\u0442\u0435 \u0442\u0443\u0440\u0430\u043C\u0430: $1","sc-end-h-np":"\u0414\u0436\u0443\u043A\u044A \u043F\u0440\u043E\u0431\u043B\u0435\u043C\u0430 \u0442\u0430\u0431\u044B\u043B\u043C\u0430\u0433\u044A\u0430\u043D\u0434\u044B","sc-end-b-np":"\u0410\u043B\u0433\u044A\u044B\u0448\u043B\u0430\u0439\u043C\u0430, \u044D\u0440\u043A\u0438\u043D \u0431\u0438\u043B\u0438\u043C\u043B\u0435 \u0431\u0430\u0440\u043C\u0430\u0433\u044A\u044B\u0433\u044A\u044B\u0437\u043D\u044B \u0443\u0447\u0443\u043D\u0434\u0430\u0434\u044B!","sc-end-h-err":"\u0411\u0438\u0440 \u043A\u044A\u0430\u0443\u0443\u043C \u043F\u0440\u043E\u0431\u043B\u0435\u043C\u0430 \u0442\u0430\u0431\u044B\u043B\u0433\u044A\u0430\u043D\u0434\u044B","sc-end-b-err":"\u0412\u0438\u043A\u0438\u043C\u0435\u0434\u0438\u0430 \u0441\u0430\u0439\u0442\u043B\u0430\u0434\u0430 \u0441\u044B\u043D\u0430\u043C\u044B\u0433\u044A\u044B\u0437\u0433\u044A\u0430 \u043A\u044A\u0430\u0440\u0443\u0443 \u044D\u0442\u0433\u0435\u043D, \u0430\u0443\u0443\u0433\u044A\u0443\u0437\u0434\u0430 \u0431\u0438\u0440 \u043A\u044A\u0430\u0443\u0443\u043C \u043F\u0440\u043E\u0431\u043B\u0435\u043C\u0430 \u0431\u0430\u0440\u0434\u044B.","sc-end-b-err-1t":"\u0411\u0443 \u043D\u0435\u043A \u0431\u043E\u043B\u0434\u0443?","sc-end-b-err-1p1":"\u0411\u0438\u0440\u0438\u043D\u0447\u0438\u0441\u0438, \u0431\u0443 \u0441\u0438\u0437\u043D\u0438 \u0442\u0435\u0440\u0441\u043B\u0438\u0433\u0438\u0433\u0438\u0437 \u0442\u044E\u043B\u0434\u044E!","sc-end-b-err-1p2":"\u0411\u0430\u0439\u043B\u0430\u043C\u043D\u044B \u0431\u0443\u0437\u0443\u0433\u044A\u0443, \u0430\u0443\u043B\u0430\u043D\u044B \u0431\u0443\u0437\u0443\u043A\u044A\u043B\u0430\u0440\u044B, \u043A\u043E\u043C\u043F\u0430\u043D\u0438\u044F\u043D\u044B \u0430\u0443 \u043F\u043E\u043B\u0438\u0442\u0438\u043A\u0430\u0441\u044B \u043D\u0435\u0434\u0430 \u043A\u044A\u0440\u0430\u043B \u0446\u0435\u043D\u0437\u0443\u0440\u0430 \u0431\u043B\u0430 \u0431\u0430\u0439\u043B\u0430\u043C\u043B\u044B \u0431\u043E\u043B\u0443\u0440\u0433\u044A\u0430 \u0431\u043E\u043B\u043B\u0443\u043A\u044A\u0434\u0443.","sc-end-b-err-1p3":"IP-\u0430\u0434\u0440\u0435\u0441\u043B\u0435\u043D\u0438 \u0431\u043B\u043E\u043A \u044D\u0442\u0438\u0443\u043B\u0435\u0440\u0438 \u0441\u0438\u0437\u043D\u0438 \u043F\u0440\u043E\u043A\u0441\u0438-\u0441\u0435\u0440\u0432\u0435\u0440 \u043D\u0435\u0434\u0430 VPN \u043A\u044A\u0443\u043B\u043B\u0443\u043A\u044A\u043B\u0430\u043D\u044B \u0445\u0430\u0439\u044B\u0440\u043B\u0430\u043D\u043D\u0433\u0430\u043D\u044B\u0433\u044A\u044B\u0437 \u0447\u0443\u0440\u0443\u043C \u0431\u043E\u043B\u0443\u0440\u0433\u044A\u0430 \u0431\u043E\u043B\u043B\u0443\u043A\u043B\u044A\u0434\u0443. \u0410\u043B\u043B\u0430\u0439 \u043A\u044A\u0443\u043B\u043B\u0443\u043A\u044A\u043B\u0430\u043D\u044B \u0445\u0430\u0439\u044B\u0440\u043B\u0430\u043D\u044B\u0443, \u0441\u0438\u0437\u043D\u0438 IP-\u0430\u0434\u0440\u0435\u0441\u0438\u0433\u0438\u0437\u043D\u0438, \u0430\u043B\u0430\u043D\u044B IP-\u0430\u0434\u0440\u0435\u0441\u0438\u043D\u0435 \u0430\u043B\u043C\u0430\u0448\u0434\u044B\u0440\u0430\u0434\u044B, \u0430\u043D\u044B \u0412\u0438\u043A\u0438\u043C\u0435\u0434\u0438\u0430 \u043F\u0440\u043E\u0435\u043A\u0442\u043B\u0435\u0440\u0438 \u0432\u0430\u043D\u0434\u0430\u043B\u043B\u044B\u043A\u044A\u043D\u044B \u0430\u043B\u043B\u044B\u043D \u0442\u044B\u044F\u0440 \u0430\u043C\u0430\u043B \u0431\u043B\u0430 \u0442\u044E\u0437\u0435\u0442\u0438\u0443\u0434\u0435\u043D \u0431\u043B\u043E\u043A \u044D\u0442\u0435\u0440\u0433\u0435 \u0431\u043E\u043B\u043B\u0443\u043A\u044A\u0434\u0443\u043B\u0430.","sc-end-b-err-2t":"\u041D\u0435 \u044D\u0442\u0435\u0440\u0433\u0435 \u043A\u0435\u0440\u0435\u043A\u043C\u0435?","sc-end-b-err-2p1":"\u0411\u0430\u0439\u043B\u0430\u043D\u044B\u0440 \u044E\u0447\u044E\u043D \u043F\u0440\u043E\u043A\u0441\u0438\u043B\u0435\u043D\u0438 \u043D\u0435\u0434\u0430 VPN \u043A\u044A\u0443\u043B\u043B\u0443\u043A\u044A\u043B\u0430\u043D\u044B \u0441\u044B\u043D\u0430.","sc-end-b-err-2p2":"IP-\u0430\u0434\u0440\u0435\u0441\u043D\u0438 \u0431\u043B\u043E\u0433\u0443\u043D \u0442\u044B\u044F\u0440 \u044E\u0447\u044E\u043D, \u0442\u0438\u043B\u0435\u0439\u0431\u0438\u0437, [https://en.wikipedia.org/wiki/Wikipedia:IP_block_exemption IP \u0431\u043B\u043E\u043A\u0434\u0430\u043D \u043A\u044A\u0443\u0442\u0443\u043B\u0443\u0440\u0433\u044A\u0430 \u0445\u0430\u043A\u044A\u043B\u0430\u043D\u044B \u0438\u0437\u043B\u0435\u0433\u0438\u0437], \u043E\u043B \u0437\u0430\u043C\u0430\u043D\u0434\u0430 \u0445\u044B\u0439\u0441\u0430\u0431\u044B\u0433\u044A\u044B\u0437\u0433\u044A\u0430 \u0442\u0438\u0439\u0438\u043B\u043B\u0438\u043A \u0442\u044E\u043B\u0434\u044E.","sc-total":"\u0421\u0430\u0439\u0442\u043B\u0430\u043D\u044B \u0431\u044E\u0442\u0435\u0443\u043B\u0435\u0439 \u0441\u0430\u043D\u044B: $1","sc-inaccessible":"\u041A\u0438\u0440\u0438\u0448 \u044D\u0442\u0430\u043B\u043C\u0430\u0439\u0441\u044B\u0437: $1","sc-blocked":"\u0422\u044E\u0437\u0435\u0442\u0443 \u044D\u0442\u0430\u043B\u043C\u0430\u0439\u0441\u044B\u0437: $1","sc-domain-desc":"$1 \u044D\u043C\u0434\u0430 $2 \u0430\u0441\u043B\u0430\u043C","sc-domain-desc-none":"\u0434\u0436\u043E\u043A\u044A\u0434\u0443","sc-btn-hide":"\u0411\u0438\u043B\u0433\u0438\u043B\u0435\u043D\u0438 \u0434\u0436\u0430\u0448\u044B\u0440","sc-btn-show":"\u0411\u0438\u043B\u0433\u0438\u043B\u0435\u043D\u0438 \u043A\u0451\u0440\u0433\u044E\u0437\u0442","sc-btn-recheck":"\u041A\u044A\u0430\u0439\u0442\u0430\u0440\u044B\u0431 \u0442\u0438\u043D\u0442\u0438\u0443","sc-btn-dl":"\u0414\u0436\u044E\u043A\u043B\u0435\u043D\u043D\u0433\u0435\u043D \u0434\u0430\u0442\u0430"};export{a as checking,n as default,i as pending,e as title};
//# sourceMappingURL=krc.74dbcf62.js.map
