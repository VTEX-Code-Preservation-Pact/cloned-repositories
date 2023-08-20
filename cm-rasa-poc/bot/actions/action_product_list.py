# Este arquivo contém uma custom action que utiliza código python
# para executar ações no diálogo.
#
# Veja o guia na documentação do RASA em:
# https://rasa.com/docs/rasa/core/actions/#custom-actions/

from typing import Any, Text, Dict, List

from rasa_sdk import Action, Tracker
from rasa_sdk.executor import CollectingDispatcher
from rasa_sdk.events import SlotSet

from pprint import pformat

import os

import logging

logger = logging.getLogger(__name__)
logging.basicConfig(level="DEBUG")


class ActionProductList(Action):
    def name(self) -> Text:
        return "action_product_list"

    def run(
        self,
        dispatcher: CollectingDispatcher,
        tracker: Tracker,
        domain: Dict[Text, Any],
    ) -> List[Dict[Text, Any]]:
        # TODO: query VTEX's product list database to match the products
        # with what the user has ordered

        entities = tracker.latest_message["entities"]
        logger.info(f"Extracted entities: {pformat(entities)}")

        message = "Lista de produtos: "
        current_group = 1
        for current_group in range(1, len(entities)):
            logger.info(f"Loop {current_group}")

            product = next(tracker.get_latest_entity_values(entity_type="product", entity_group=str(current_group)), None)
            quantity = next(tracker.get_latest_entity_values(entity_type="quantity", entity_group=str(current_group)), None)

            if product != None or quantity != None:
                message += f"\n{product}: ({quantity})"


        # Get product list from VTEX store
        # match against user provided input
        # try best we can to find the most likely candidate
        # We need to give back a list of items that didn't quite match
        # the user intent and ask them to provide more information or just forget about it

        dispatcher.utter_message(message)
        return []
