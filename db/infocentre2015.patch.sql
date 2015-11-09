Exception in thread "main" ru.yandex.mysqlDiff.script.CombinatorParserException: [32.12] failure: identifier expected

    quantit? TINYINT(4) NOT NULL,

           ^
	at ru.yandex.mysqlDiff.script.SqlParserCombinator.parse(parser.scala:425)
	at ru.yandex.mysqlDiff.script.SqlParserCombinator.parse(parser.scala:430)
	at ru.yandex.mysqlDiff.script.Parser.parse(parser.scala:708)
	at ru.yandex.mysqlDiff.model.ModelParser.parseModel(ModelParser.scala:37)
	at ru.yandex.mysqlDiff.Utils.getModelFromArgsLine(main.scala:32)
	at ru.yandex.mysqlDiff.Diff$.main(main.scala:145)
	at ru.yandex.mysqlDiff.Diff.main(main.scala)
