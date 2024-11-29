<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20240724101702 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('DROP SEQUENCE messenger_messages_id_seq CASCADE');
        $this->addSql('CREATE TABLE sqs_step (id UUID NOT NULL, url VARCHAR(1000) NOT NULL, region VARCHAR(100) NOT NULL, access_key VARCHAR(100) NOT NULL, secret_key VARCHAR(100) NOT NULL, message_group_id VARCHAR(100) NOT NULL, content JSONB DEFAULT NULL, PRIMARY KEY(id))');
        $this->addSql('COMMENT ON COLUMN sqs_step.id IS \'(DC2Type:uuid)\'');
        $this->addSql('ALTER TABLE sqs_step ADD CONSTRAINT FK_58EA94D0BF396750 FOREIGN KEY (id) REFERENCES abstract_step (id) ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('DROP TABLE messenger_messages');
        $this->addSql('ALTER TABLE log ALTER created_at TYPE TIMESTAMP(6) WITHOUT TIME ZONE');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SCHEMA public');
        $this->addSql('CREATE SEQUENCE messenger_messages_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE TABLE messenger_messages (id BIGSERIAL NOT NULL, body TEXT NOT NULL, headers TEXT NOT NULL, queue_name VARCHAR(190) NOT NULL, created_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, available_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, delivered_at TIMESTAMP(0) WITHOUT TIME ZONE DEFAULT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX idx_75ea56e016ba31db ON messenger_messages (delivered_at)');
        $this->addSql('CREATE INDEX idx_75ea56e0e3bd61ce ON messenger_messages (available_at)');
        $this->addSql('CREATE INDEX idx_75ea56e0fb7336f0 ON messenger_messages (queue_name)');
        $this->addSql('COMMENT ON COLUMN messenger_messages.created_at IS \'(DC2Type:datetime_immutable)\'');
        $this->addSql('COMMENT ON COLUMN messenger_messages.available_at IS \'(DC2Type:datetime_immutable)\'');
        $this->addSql('COMMENT ON COLUMN messenger_messages.delivered_at IS \'(DC2Type:datetime_immutable)\'');
        $this->addSql('ALTER TABLE sqs_step DROP CONSTRAINT FK_58EA94D0BF396750');
        $this->addSql('DROP TABLE sqs_step');
        $this->addSql('ALTER TABLE log ALTER created_at TYPE TIMESTAMP(0) WITHOUT TIME ZONE');
    }
}
